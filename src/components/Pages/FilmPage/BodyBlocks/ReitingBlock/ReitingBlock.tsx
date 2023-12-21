import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './ReitingBlock.scss'
import Button from "../../../../UI/Buttons/Button/Button";
import { ReitingBlockProps } from "../../../../../types/filmPageTypes";
import { useDispatch } from "react-redux";
import { gradeTrue } from "../../../../../store/reducers/gradeReducer";

const ReitingBlock:FC<ReitingBlockProps> = ({ratingKp , votesKp}) => {
    const {t, i18n} = useTranslation();

    let reiting = (Math.round(ratingKp! * 10)/10);
    const [goodClass, setGoodCLass] = useState('reitingBlock__reiting');

    useEffect( () => {
        if (reiting >= 7) {
            setGoodCLass('reitingBlock__reiting reitingBlock__reiting_green')
        };
    },[reiting]);

    //Redux
    const dispatch = useDispatch();
    const onIncrement = () => {
        dispatch(gradeTrue())
    }
    
 
    return (
        <div className="reitingBlock" onClick={onIncrement}>
            <div className="reitingBlock__inner" >
                <div className={goodClass}>
                    <p className="reitingBlock__count">{reiting}</p>
                </div>
                <div className="reitingBlock__info">
                    <p className="reitingBlock__heading">{t('filmPage.reitingBlock.reit')} </p>
                    <p className="reitingBlock__text">{t('filmPage.reitingBlock.int')}</p>
                    <p className="reitingBlock__text reitingBlock__text_reit">{votesKp} {t('filmPage.reitingBlock.votes')}</p>
                </div> 
            </div>
            <div className="reitingBlock__btn" >
                <Button color="transparent" onClick={() => {}} title={['filmPage.reitingBlock.btn']}/>    
            </div>
        </div>
    );
};

export default ReitingBlock;