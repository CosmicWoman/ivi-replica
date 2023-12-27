import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import './GradeBlock.scss';

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { gradeFalse } from "../../store/reducers/gradeReducer";

import Icons from "../Icons/Icons";

const GradeBlock = () => {

    const {t, i18n} = useTranslation();
    const grades = Array.from({length: 10}, (_, index) => index + 1);

    //Действия для ответа в модальном блоке
    const questionBlock = document.querySelector('#question-block');
    const completeBlock = document.querySelector('#complete-block');

    function getAnswer() {
        questionBlock?.classList.add('gradeBlock__modal_hidden');
        completeBlock?.classList.remove('gradeBlock__modal_hidden');
    }

    //Redux
    const gradeBlock = document.querySelector('#grade-block');
    const dispatch = useDispatch();
    const {value} = useTypedSelector( state => state.grade);

    const onDecrement = () => {
        
        completeBlock?.classList.add('gradeBlock__modal_hidden');
        questionBlock?.classList.remove('gradeBlock__modal_hidden');
        dispatch(gradeFalse());
    }

    useEffect(() => {
        if (value) {
            gradeBlock?.classList.remove('gradeBlock__hidden');
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.body.style.overflow = 'hidden'
        } else {
            gradeBlock?.classList.add('gradeBlock__hidden');
            document.body.style.overflow = '';
        }
    },[value])


    return (
        <div className="gradeBlock gradeBlock__hidden" id='grade-block'> 

            <div className="gradeBlock__close" onClick={onDecrement}>
                <Icons className="gradeBlock__svg" name="cross" size="30"/>    
            </div>

            <div className="gradeBlock__modal" id='question-block'> 
                <h2 className="gradeBlock__heading">{t('filmPage.gradeBlock.grade')}</h2>
                <p className="gradeBlock__text">{t('filmPage.gradeBlock.rec')}</p>
                <div className="gradeBlock__optionSelector">
                  
                    <div className="gradeBlock__box">
                        {grades.map ( 
                            (item: any) => 
                                <div className="gradeBlock__optionWrapper" key={item}>
                                    <div className="gradeBlock__option" onClick={getAnswer}>
                                        <div className="gradeBlock__option-caption">{item}</div>
                                    </div>
                                </div>
                            )
                        };
                    </div>

                    <div className="gradeBlock__labelBlock">
                        <div className="gradeBlock__label gradeBlock__label_left">{t('filmPage.gradeBlock.bad')}</div>
                        <div className="gradeBlock__label gradeBlock__label_right">{t('filmPage.gradeBlock.good')}</div>
                    </div>
                </div>    
            </div>

            <div className="gradeBlock__modal gradeBlock__modal_hidden" id='complete-block'>
                <div className="gradeBlock__complete">
                    <Icons className="gradeBlock__svg gradeBlock__svg_complete" name="complete" size="68" color="green"/> 
                </div>
                <h2 className="gradeBlock__heading">{t('filmPage.gradeBlock.get')}</h2>
                <p className="gradeBlock__text">{t('filmPage.gradeBlock.thank')}</p>
            </div>

        </div>
    )
}

export default GradeBlock;
