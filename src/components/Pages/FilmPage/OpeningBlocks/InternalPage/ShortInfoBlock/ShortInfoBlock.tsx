import React, { FC, useEffect, useState } from "react";
import './ShortInfoBlock.scss';
import { ShortInfoBlockProps } from "../../../../../../types/filmPageTypes";

import LanguageHook from "../../../../../../hooks/LanguageHook";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import Icons from "../../../../../Icons/Icons";

const ShortInfoBlock:FC<ShortInfoBlockProps> = ({ film, onDecrement}) => {

    const {t, i18n} = useTranslation();
    const {internalPageBlockStatus} = useTypedSelector( state => state.internalPage);

    const [country, setCountry] = useState ('');
    const [length, setLength] = useState('');
    const [genre, setGenre] = useState('')

    useEffect( () => {

        setCountry( LanguageHook (film.countries[0]?.countryName, film.countries[0]?.countryNameEn, i18n.language) );
        setLength( LanguageHook (movieLengthChanger('ru', film.movieLength), movieLengthChanger('en', film.movieLength), i18n.language) );
        setGenre( LanguageHook (film.genres[0]?.nameRu, film.genres[0]?.nameEn, i18n.language))
    
    },[film, internalPageBlockStatus])

    function movieLengthChanger (language: string , movieLength: number) {
      
        switch (language) {

            case 'ru':
                return `${movieLength} минут`; 
                break;

            case 'en':
                return `${movieLength} minutes`;
                break;

            default: 
                return ''
        }    
    };
    
    return (
        <div className="shortInfoBlock">

            <img className="shortInfoBlock__img" src={film.smallPictureUrl} alt="smallPicture" onClick={onDecrement}/>
            
            <div className="shortInfoBlock__inner">
                <p className="shortInfoBlock__reit">{ ( Math.round(film.ratingKp * 10) ) / 10}</p>    
                <Icons name="rate" size="20" color="red" className="shortInfoBlock__svg_rate"/>
            </div>

            <div className="shortInfoBlock__inner">
                <p className="shortInfoBlock__text">
                    {film.year}, {country}, {genre}
                </p>
            </div>

            <div className="shortInfoBlock__inner">
                <Icons name="time" size="16" color="red" strokeWidth="2" className="shortInfoBlock__svg_time"/>
                <p className="shortInfoBlock__text">{length}</p>
            </div>

        </div>
    );
};

export default ShortInfoBlock;