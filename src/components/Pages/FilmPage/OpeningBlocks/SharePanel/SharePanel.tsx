import React, { FC, useEffect, useState } from "react";
import './SharePanel.scss'
import Icons from "../../../../Icons/Icons";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { sharePanelFalse } from "../../../../../store/reducers/sharePanelReducer";
import LanguageHook from "../../../../../hooks/LanguageHook";
import { useTranslation } from "react-i18next";

interface SharePanelProps {
    smallPictureUrl: string,
    filmName: string,
    year: number,
    movieLength: number
}

const SharePanel:FC<SharePanelProps> = ({smallPictureUrl, filmName, year, movieLength}) => {

    const {t, i18n} = useTranslation();
    const [length, setLength] = useState('');

    function movieLengthChanger (language: string) {

        let lengthHour = Math.trunc(movieLength/60);
        let lengthMinutes = movieLength - lengthHour*60;
        
        switch (language) {

            case 'ru':
                return `${lengthHour}ч. ${lengthMinutes} мин.`; 
                break;

            case 'en':
                return `${lengthHour}h. ${lengthMinutes} min.`;
                break;

            default: 
                return ''
        }    
    };
    useEffect(() => {
        setLength ( LanguageHook (movieLengthChanger('ru'), movieLengthChanger('en'), i18n.language) );
    }, [i18n.language]);

    const sharePanel = document.querySelector('#share-panel');
    const dispatch = useDispatch();

    const {sharePanelStatus} = useTypedSelector( state => state.sharePanel);

    const onDecrement = () => {
        dispatch(sharePanelFalse());
        sharePanel?.classList.add('sharePanel__hidden');
    }

    useEffect(() => {

        if (sharePanelStatus) {
            sharePanel?.classList.remove('sharePanel__hidden');
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        } else {
            sharePanel?.classList.add('sharePanel__hidden');
            document.body.style.overflow = '';
        }
        
    },[sharePanelStatus])
    return (
        <div className="sharePanel sharePanel__hidden" id="share-panel">
            <div className="sharePanel__panel">
                <div className="sharePanel__head">
                    <div className="sharePanel__left">
                        <img className="sharePanel__img" src={smallPictureUrl} alt="" />
                    </div>
                    <div className="sharePanel__right">
                        <h5 className="sharePanel__heding">{filmName}</h5>
                        <div className="sharePanel__bottom">
                            <span className="sharePanel__text">{year} </span>
                            <Icons 
                                className="sharePanel__svg sharePanel__svg_circle-flooded"
                                name="circle-flooded" 
                                size='4' 
                                color="#b0afb1"
                            />
                            <span className="sharePanel__text">{length}</span>
                        </div>
                    </div>
                    <div className="sharePanel__close" onClick={onDecrement}>
                        <Icons className="sharePanel__svg" name="cross" size="16" />    
                    </div>
                </div>
                <div className="sharePanel__body">
                    <div className="sharePanel__part">
                        <div className="sharePanel__btn sharePanel__btn_solo">
                            <p className="sharePanel__btnTitle">{t('filmPage.sharePanel.copy')}</p>
                            <Icons className="sharePanel__icon" name='copy' color='gray' size='20'strokeWidth="2"/>
                        </div>
                    </div>
                    <div className="sharePanel__part sharePanel__part_center">
                        <div className="sharePanel__btn sharePanel__btn_top">
                            <div className="sharePanel__btnTitle">WhatsApp</div>
                            <Icons className="sharePanel__icon" name='whatsup' color='gray' size='20'strokeWidth="0"/>
                        </div>
                        <div className="sharePanel__btn sharePanel__btn_center">
                            <div className="sharePanel__btnTitle">Telegram</div>
                            <Icons className="sharePanel__icon" name='telegram' color='gray' size='20'strokeWidth="0"/>
                        </div>
                        <div className="sharePanel__btn sharePanel__btn_bottom">
                            <div className="sharePanel__btnTitle">Viber</div>
                            <Icons className="sharePanel__icon" name='viber' color='gray' size='20' strokeWidth="0"/>
                        </div>
                    </div>
                    <div className="sharePanel__part">
                        <div className="sharePanel__btn sharePanel__btn_top">
                            <div className="sharePanel__btnTitle">{t('filmPage.sharePanel.vk')}</div>
                            <Icons className="sharePanel__icon" name='vkontakte' color='gray' size='20'/>
                        </div>
                        <div className="sharePanel__btn sharePanel__btn_center">
                            <div className="sharePanel__btnTitle">{t('filmPage.sharePanel.ok')}</div>
                            <Icons className="sharePanel__icon" name='odnoklasniki' color='gray' size='20'/>
                        </div>
                        <div className="sharePanel__btn sharePanel__btn_bottom">
                            <div className="sharePanel__btnTitle">Twitter</div>
                            <Icons className="sharePanel__icon" name='twitter' color='gray' size='20'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePanel;
