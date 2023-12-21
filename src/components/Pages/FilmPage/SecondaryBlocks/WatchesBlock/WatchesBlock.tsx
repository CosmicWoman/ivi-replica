import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import './WatchesBlock.scss';
import { WatchesBlockProps } from "../../../../../types/filmPageTypes";

import Button from "../../../../UI/Buttons/Button/Button";
import imageTv from '../../../../../static/img/FilmPage/tv-without-poster.png'
import imageTablet from '../../../../../static/img/FilmPage/ipad-without-poster.png'
import OpenUrl from "../../../../../hooks/OpenUrl";

const WatchesBlock:FC<WatchesBlockProps> = ({filmName, bigPictureUrl, smallPictureUrl}) => {
    const {t, i18n} = useTranslation();

    return (
        <div className="watchesBlock">
            <div className="watchesBlock__body">
                <div className="watchesBlock__column watchesBlock__column_control">
                    <h3 className="watchesBlock__heading">{t('filmPage.watchesBlock.watch')} «{filmName}» {t('filmPage.watchesBlock.all')}</h3>
                    <p className="watchesBlock__text">{t('filmPage.watchesBlock.available')}</p>
                    <div className="watchesBlock__desktop">
                        <Button title={['filmPage.watchesBlock.connect']} color="red" onClick={() => OpenUrl('https://www.ivi.ru/')}/>    
                    </div>
                    <div className="watchesBlock__mobile" >
                        <Button title={['filmPage.watchesBlock.connect']} 
                        color="red" type="ultraWide"
                        onClick={() => OpenUrl('https://www.ivi.ru/')}
                        />    
                    </div>
                </div>
                <div className="watchesBlock__column watchesBlock__column_img">
                    <div className="watchesBlock__image-container">
                        <img className="watchesBlock__image-tv" src={imageTv} alt="Tv" />
                        <img className="watchesBlock__image-tablet" src={imageTablet} alt="Tablet" />
                        <div className="watchesBlock__poster-tv">
                            <img className="watchesBlock__posterTv" src={bigPictureUrl} alt="TvPoster" />
                        </div>
                        <div className="watchesBlock__poster-tablet">
                            <img className="watchesBlock__posterTablet" src={smallPictureUrl} alt="TabletPoster" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchesBlock;