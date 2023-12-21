import React, { FC, useEffect, useState } from "react";
import { HeaderAdvertiseProps } from "../../../types/headerTypes";
import classes from './HeaderAdvertise.module.scss'
import Button from "../../UI/Buttons/Button/Button";
import Icons from "../../Icons/Icons";
import OpenUrl from "../../../hooks/OpenUrl";
import { useTranslation } from 'react-i18next';

const HeaderAdvertise:FC<HeaderAdvertiseProps> = ( {variant}) => {
    const { t, i18n } = useTranslation();

    let title = 'header.advertise.ivi';
    let imgUrl = 'https://www.ivi.ru/pages/newseason/assets/images/new-logo-short.svg';
    let price = '199';
    let link = 'https://www.ivi.ru/profile/subscription';
    switch(variant) {
        case 'amediateka':
            title= 'Amediateka';
            imgUrl = 'https://toplogos.ru/images/logo-amediateka.png';
            link = 'https://www.ivi.ru/profile/subscription-ivi-amediateka';
            price = '267';
            break;
    };

    //Анимация при наведении
    const hiddenBlock = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const animBlock = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const [blockStatus, setBlockStatus] = useState (false);

    function hoverListener(e: React.DragEvent<HTMLDivElement>) {
        setBlockStatus(true);
    };

    function leaveListener(e: React.DragEvent<HTMLDivElement>) {
        e.stopPropagation();
        setBlockStatus(false); 
    };

    useEffect( () => {

        switch(blockStatus) {
            case (true) :
                hiddenBlock.current.classList.remove(hiddenBlock.current.classList.value);
                hiddenBlock.current.classList.add(classes.advertise__inner);
                animBlock.current.classList.remove(classes.advertise__top_close);
                animBlock.current.classList.add(classes.advertise__top_open);
                break;
            case (false) :
                hiddenBlock.current.classList.remove(hiddenBlock.current.classList.value);
                hiddenBlock.current.classList.add(classes.advertise__innerHidden);
                if (animBlock.current.classList[1]?.includes('open')) {
                    animBlock.current.classList.remove(classes.advertise__top_open);
                    animBlock.current.classList.add(classes.advertise__top_close);
                 }
                break;
        };

        setTimeout( function () {
            if (animBlock.current.classList[1]?.includes('close')) {
                animBlock.current.classList.remove(classes.advertise__top_close);
            };
        }, 400);

    },[blockStatus]);

    return (
        <div className={classes.advertise}>
            <div className={classes.advertise__block}
                onMouseOver={hoverListener}
                onMouseOut={leaveListener}
            >
                <div className={classes.advertise__top} ref={animBlock}>
                    <img className={classes.advertise__logo} src={imgUrl} alt="Логотип выбранной подписки"></img>
                    <div className={classes.advertise__right}>
                        <h4 className={classes.advertise__heading}>{t(title)}</h4> 
                        <p className={classes.advertise__text}>{t('header.advertise.from')} {price} {t('header.advertise.mouth')}</p>
                    </div>
                </div>
                <div 
                    className={classes.advertise__innerHidden}
                    ref={hiddenBlock}
                >
                    <Button color="red" 
                            title={['button.header.advertise.plug']} 
                            type="ultraWide"
                            onClick={() => OpenUrl(link)}/>

                    <p className={classes.advertise__smallText }>{t('header.advertise.turnOff')}</p>  
                </div>
            </div>
            <Button svg={<Icons name='smartTV' color='#fff' size='20'/>}
                    title={['button.header.advertise.smart']}
                    onClick={() => OpenUrl('https://www.ivi.tv/pages/tvsmart/')}/>
                    
        </div>
    );
};

export default HeaderAdvertise;