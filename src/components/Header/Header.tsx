import React, { useEffect, useRef, useState } from "react";
import './Header.scss';

import HeaderSections from "./HeaderSections/HeaderSections";
import HeaderMenuFilms from "./HeaderMenu/HeaderMenuFilms/HeaderMenuFilms";
import HeaderMenuSeries from "./HeaderMenu/HeaderMenuSeries/HeaderMenuSeries";
import HeaderMenuMults from "./HeaderMenu/HeaderMenuMults/HeaderMenuMults";
import HeaderMenuTv from "./HeaderMenu/HeaderMenuTv/HeaderMenuTv";
import HeaderMenuSubscribe from "./HeaderMenu/HeaderMenuSubscribe/HeaderMenuSubscribe";
import HeaderMenuNotify from "./HeaderMenu/HeaderMenuNotify/HeaderMenuNotify";
import HeaderMenuLogin from "./HeaderMenu/HeaderMenuLogin/HeaderMenuLogin";

import LanguageChanger from "./LanguageChanger/LanguageChanger";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {

    //Получение ширины постоянно отображающегося хедера
    const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

    const GetElementWidth = () => {
        
        const [width, setWidth] = useState<null | number>(null);
     
        const observer = useRef(
          new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            //24 - sum of paddings
            setWidth(width + 24);
          })
        );
       
        useEffect( () => {
          observer.current.observe(ref.current);
        }, [ref, observer]);
     
        return  width;
    };

    let width = `${GetElementWidth()}px`;

    //Логика открытия выпадающего меню
    const dropDown = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const[dropDownVariant, setDropDownVariant] = useState ( 'headerMenuFilms' );
    const[variantID, setVariatnID] = useState( '#drop-down-films' );
    
    const[chosenVariant, setChosenVariant] = useState('');
    let block = null;
    const dropdownBlock = document.querySelector('#drop-down-block');
    const headerTop = document.querySelector('#header-top');

    useEffect( () => {

        document.querySelector(`${variantID}`)?.classList.add(`${dropDownVariant}__hidden`);

        //workaroud для отображения пунктов выпадающего списка

        if ( (chosenVariant == 'Фильмы') || (chosenVariant == 'Movies') ) {
            block = document.querySelector('#drop-down-films')
            block?.classList.remove('headerMenuFilms__hidden')
            setVariatnID('#drop-down-films')
            setDropDownVariant('headerMenuFilms')
        } else if ( (chosenVariant == 'Сериалы') || (chosenVariant == 'Series') ) {
            block = document.querySelector('#drop-down-series')
            block?.classList.remove('headerMenuSeries__hidden')
            setVariatnID('#drop-down-series')
            setDropDownVariant('headerMenuSeries')
        } else if ( (chosenVariant == 'Мультфильмы') || (chosenVariant == 'Cartoons') ) {
            block = document.querySelector('#drop-down-mults')
            block?.classList.remove('headerMenuMults__hidden')
            setVariatnID('#drop-down-mults')
            setDropDownVariant('headerMenuMults')
        } else if (chosenVariant == 'TV+') {
            block = document.querySelector('#drop-down-tv')
            block?.classList.remove('headerMenuTv__hidden')
            setVariatnID('#drop-down-tv')
            setDropDownVariant('headerMenuTv')
        } else if (chosenVariant.includes('notification')) {
            block = document.querySelector('#drop-down-notify')
            block?.classList.remove('headerMenuNotify__hidden')
            setVariatnID('#drop-down-notify')
            setDropDownVariant('headerMenuNotify')
        } else if(chosenVariant.includes('person')) {
            block = document.querySelector('#drop-down-login')
            block?.classList.remove('headerMenuLogin__hidden')
            setVariatnID('#drop-down-login')
            setDropDownVariant('headerMenuLogin')
        }else if( (chosenVariant.includes('дней')) || (chosenVariant.includes('days'))) {
            block = document.querySelector('#drop-down-subscribe')
            block?.classList.remove('headerMenuSubscribe__hidden')
            setVariatnID('#drop-down-subscribe')
            setDropDownVariant('headerMenuSubscribe')
        } 

    }, [chosenVariant]);

    const hoverListener = (e: React.DragEvent<HTMLDivElement>) => {
        let checkWidth = parseInt(width.replace(/[^\d]/g, ''))
        

        if ( checkWidth > 1099 ) {

            dropdownBlock?.classList.remove('header__dropDownBody_hidden');
            headerTop?.classList.add('header__container_active');
                
            //console.log(e.currentTarget.innerHTML.length)
            //Условие для workaround (длина выпадающего списка всегда >1000, длина кнопок меню <350)
            if (e.currentTarget.innerHTML.length < 350) {
                setChosenVariant(e.currentTarget.innerHTML); 
            };

        };
    };

    const leaveListener = (e: React.DragEvent<HTMLDivElement>) => {
        
        headerTop?.classList.remove('header__container_active');
        dropdownBlock?.classList.add('header__dropDownBody_hidden');
        
    };

    //Открытие блока поиска
    const searchSection = React.useRef() as React.MutableRefObject<HTMLDivElement>;

    function toggleSearchSection (e: React.MouseEvent<HTMLDivElement>) {

        searchSection.current.classList.toggle('searchBlock__hidden');

        if ( e.currentTarget.className.includes('headerSections__btn-block_search')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        };
    };
    
    return (
        <div className='header' data-testid='header'>
            <LanguageChanger />

            <div className="header__body">

                <div  className="container header__container" ref={ref} id='header-top'>
                    <HeaderSections hoverListener={hoverListener} 
                                    leaveListener={leaveListener}
                                    toggleSearchSection={toggleSearchSection}/>
                </div>

                <div className="header__dropDownBody header__dropDownBody_hidden"
                    id='drop-down-block'
                    data-testid='headerDropDownMenu'
                    style={{'width': width}} 
                    onMouseOver={hoverListener}
                    onMouseLeave={leaveListener}
                >
                    <div className="dropDownBody__body" id='drop-down-body' ref={dropDown}>
                        <HeaderMenuFilms id='drop-down-films'/>
                        <HeaderMenuSeries id='drop-down-series'/>
                        <HeaderMenuMults id="drop-down-mults"/>
                        <HeaderMenuTv id="drop-down-tv"/>
                        <HeaderMenuSubscribe id="drop-down-subscribe"/>
                        <HeaderMenuNotify id="drop-down-notify"/>
                        <HeaderMenuLogin id="drop-down-login"/>
                    </div>
                </div>
            </div>

            <HeaderSearch 
                searchSection={searchSection} 
                toggleSearchSection={toggleSearchSection}
                /> 
        </div>
    )
}

export default Header;