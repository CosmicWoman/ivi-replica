import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SummaryBlockProps } from "../../../../../types/filmPageTypes";
import './SummaryBlock.scss'

import Icons from "../../../../Icons/Icons";
import QualityTag from "../../../../UI/Tags/QualityTag/QualityTag";
import LanguageHook from "../../../../../hooks/LanguageHook";
import { useNavigate } from "react-router-dom";

import typeChecker from "../../FilmPageUtils";

const SummaryBlock:FC<SummaryBlockProps> = ({filmName, year, genres, movieLength, countries}) => {
    
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [type, setType] = useState ('');
    const [country, setCountry] = useState ('');
    const [length, setLength] = useState('');

    // function typeChecker (language: string) {

    //     switch (language) {

    //         case 'ru':
    //             if ( genres.find( genre => genre.nameRu == 'мультфильм' ) ) {
    //                 return 'Мульфильм';
    //             } else {
    //                 return 'Фильм';
    //             };
    //             break;

    //         case 'en':
    //             if ( genres.find( genre => genre.nameEn == 'cartoon' ) ) {
    //                 return 'Cartoon';
    //             } else {
    //                 return 'Movie';
    //             };
    //             break;

    //         default: 
    //             return ''
    //     }
    // };

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

        setType( LanguageHook ( typeChecker('ru', genres), typeChecker('en', genres), i18n.language) );

        setCountry( LanguageHook (countries[0]?.countryName, countries[0]?.countryNameEn, i18n.language) );
        
        setLength ( LanguageHook (movieLengthChanger('ru'), movieLengthChanger('en'), i18n.language) );
    }, [countries, i18n.language]);
    
    return (

        <div className="summaryBlock"  data-testid='summaryBlock'>

            <h2 className="summaryBlock__heading">{filmName} ({type} {year})</h2>
            
            <p className="summaryBlock__text summaryBlock__text_first">
                
                <span 
                    onClick={() => navigate (`/movies-website/films/year/${year}`)}
                    className="summaryBlock__link"
                >{year} 
                </span>

                <span> {length} </span>
                <span>16+</span>
            </p>
            
            <p className="summaryBlock__text">

                <span 
                    className="summaryBlock__link"
                    onClick={() => navigate (`/movies-website/films/country/${countries[0]?.countryName}`)}
                >{country} 
                </span>

                {genres.map ( (genre) => 
                    <span 
                        key={genre.id} 
                        className="summaryBlock__link"
                        onClick={() => navigate (`/movies-website/films/genre/${genre.nameEn}`)}
                    >
                        <Icons 
                            className="summaryBlock__svg summaryBlock__svg_circle-flooded"
                            name="circle-flooded" 
                            size='4' 
                            color="#b0afb1"
                        />
                        {LanguageHook (genre.nameRu, genre.nameEn, i18n.language)}     
                    </span>)}
            </p>

            <div className="summaryBlock__additional">
                <QualityTag quality="FullHD" />
                <Icons 
                    className="summaryBlock__svg summaryBlock__svg_volume-down"
                    name="volume-down" 
                    size='22' 
                    color="#b0afb1"
                />
                <p className="summaryBlock__text">{t('filmPage.summaryBlock.ru')}</p>
                <Icons 
                    className="summaryBlock__svg summaryBlock__svg_circle-flooded"
                    name="circle-flooded" 
                    size='4' 
                    color="gray"
                />
                <p className="summaryBlock__text">Eng</p>
                <Icons 
                    className="summaryBlock__svg summaryBlock__svg_keyboard"
                    name="keyboard" 
                    size='18' 
                    color="#b0afb1"
                    strokeWidth="2"
                />
                <p className="summaryBlock__text">{t('filmPage.summaryBlock.ru')}</p>
                <Icons 
                    className="summaryBlock__svg summaryBlock__svg_circle-flooded"
                    name="circle-flooded" 
                    size='4' 
                    color="#b0afb1"
                />
                <p className="summaryBlock__text">Eng</p>
            </div>
            
        </div>
    )
}

export default SummaryBlock;