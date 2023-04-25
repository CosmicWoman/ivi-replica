import React, { useEffect, useRef, useState } from "react";
import './Header.scss';
import Button from "../UI/Buttons/Button/Button";
import Icons from "../Icons/Icons";
import HeaderMenuFilms from "./HeaderMenu/HeaderMenuFilms";
import HeaderMenuSeries from "./HeaderMenu/HeaderMenuSeries";
import HeaderMenuMults from "./HeaderMenu/HeaderMenuMults";
import HeaderMenuTv from "./HeaderMenu/HeaderMenuTv";
import HeaderMenuNotify from "./HeaderMenu/HeaderMenuNotify";
import HeaderMenuSubscribe from "./HeaderMenu/HeaderMenuSubscribe";
import HeaderMenuLogin from "./HeaderMenu/HeaderMenuLogin";

const Header = () => {

    const dropDown = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const[dropDownVariant, setDropDownVariant] = useState ( 'dropDownBody__films' );
    const[variantID, setVariatnID] = useState( '#drop-down-films' );
    
    const[chosenVariant, setChosenVariant] = useState('');
    let block = null;

    // useEffect( () => {
    //     document.querySelector(`${variantID}`)?.classList.add(`${dropDownVariant}_hidden`);
    // },[])

     
    useEffect( () => {
        
        //console.log(chosenVariant)
        //console.log(variantID)
        // console.log(dropDownVariant)
        let subscribeSVG='' 
        //workaroud для отображения пунктов выпадающего списка
        const notyfiSVG = '<svg class="icon icon-notification header__svg header__svg_notification" fill="#fff" stroke="#fff" width="16" height="16" stroke-width="1"><use xlink:href="/movies-website/static/media/icons.13e3430d3ab95b46ac28e1ec0b743cc0.svg#icon-notification"></use></svg>';
        if (chosenVariant.includes('notification')) {
            subscribeSVG = 'notification'
        } else if(chosenVariant.includes('person')) {
            subscribeSVG = 'person'
        }else if(chosenVariant.includes('дней')) {
            subscribeSVG = 'subscribe'
        } else {subscribeSVG=chosenVariant}
        
        //'<div class="Button_btn__vAok0 Button_btn__red__TLxgk"><div class="Button_btn__textBlock__IVFdx"><div class="Button_btn__text__OS4PO">Смотреть 30 дней за 1 ₽</div></div></div>';
        const loginSVG = '<div class="header__svg-border"><svg class="icon icon-person header__svg header__svg_login" fill="#fff" stroke="#fff" width="20" height="20" stroke-width="3"><use xlink:href="/movies-website/static/media/icons.13e3430d3ab95b46ac28e1ec0b743cc0.svg#icon-person"></use></svg></div>';

        //console.log(subscribeSVG)

        document.querySelector(`${variantID}`)?.classList.add(`${dropDownVariant}_hidden`);

        switch(subscribeSVG) {
            case "Фильмы":
                block = document.querySelector('#drop-down-films')
                block?.classList.remove('dropDownBody__films_hidden')
                setVariatnID('#drop-down-films')
                setDropDownVariant('dropDownBody__films')
                break;
            case "Сериалы":
                block = document.querySelector('#drop-down-series')
                block?.classList.remove('dropDownBody__series_hidden')
                setVariatnID('#drop-down-series')
                setDropDownVariant('dropDownBody__series')
                break;
            case "Мультфильмы":
                block = document.querySelector('#drop-down-mults')
                block?.classList.remove('dropDownBody__mults_hidden')
                setVariatnID('#drop-down-mults')
                setDropDownVariant('dropDownBody__mults')
                break;
            case 'TV+':
                block = document.querySelector('#drop-down-tv')
                block?.classList.remove('dropDownBody__TV_hidden')
                setVariatnID('#drop-down-tv')
                setDropDownVariant('dropDownBody__TV')
                break;
            case ('notification'):
                block = document.querySelector('#drop-down-notify')
                block?.classList.remove('dropDownBody__notify_hidden')
                setVariatnID('#drop-down-notify')
                setDropDownVariant('dropDownBody__notify')
                break;
            case ('subscribe'):
                block = document.querySelector('#drop-down-subscribe')
                block?.classList.remove('dropDownBody__subscribe_hidden')
                setVariatnID('#drop-down-subscribe')
                setDropDownVariant('dropDownBody__subscribe')
                break;
            case ('person'):
                block = document.querySelector('#drop-down-login')
                block?.classList.remove('dropDownBody__login_hidden')
                setVariatnID('#drop-down-login')
                setDropDownVariant('dropDownBody__login')
                break;
        }
        
    }, [chosenVariant])

    const hoverListener = (e: React.DragEvent<HTMLDivElement>) => {
        const dropdownBlock = document.querySelector('#drop-down-block');
        const headerTop = document.querySelector('#header-top');

        dropdownBlock?.classList.remove('header__dropDownBody_hidden');
        headerTop?.classList.add('header__container_active');

        //console.log(e.currentTarget.innerHTML.length)
        //Условие для workaround
        if (e.currentTarget.innerHTML.length < 300) {
            setChosenVariant(e.currentTarget.innerHTML); 
        };
    }

    const leaveListener = (e: React.DragEvent<HTMLDivElement>) => {
        const dropdownBlock = document.querySelector('#drop-down-block');
        const headerTop = document.querySelector('#header-top');

        dropdownBlock?.classList.add('header__dropDownBody_hidden');
        headerTop?.classList.remove('header__container_active');
    }

    const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>

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
    //console.log(GetElementWidth());  
    
    return <div className='header'>
        <div className="header__body">
            <div  className="container header__container" ref={ref} id='header-top'>
                <div className="header__content">
                    <div className="header__block">
                        <div className="header__img">
                            <svg xmlns="http://www.w3.org/2000/svg" width="77" height="56" viewBox="0 0 77 56" fill="none"><path d="M40.5122 30.7942C38.6214 47.2738 34.6849 50.4018 18.2045 48.5117C1.72562 46.6208 -1.40076 42.6835 0.487791 26.2039C2.37864 9.72428 6.31594 6.5979 22.7956 8.48875C39.2752 10.3781 42.4031 14.3154 40.5122 30.795V30.7942Z" fill="url(#paint0_linear_606_157)"/><path d="M73.0194 18.5526C71.3745 18.5526 70.0064 19.2102 68.708 21.1846L63.5314 28.9933L63.9989 22.8992C64.1721 20.6136 62.735 18.5534 60.1727 18.5534C57.7837 18.5534 56.3121 20.1637 56.1734 22.1895L55.3594 33.3223C55.1693 36.1267 56.6056 37.6849 58.961 37.6849C61.3163 37.6849 62.666 36.0746 63.7046 34.5164L68.708 26.9507L68.2581 33.3223C68.068 35.9367 69.4354 37.6849 71.9977 37.6849C74.3699 37.6849 75.8936 36.2823 76.0492 34.17L76.88 22.8984C77.0356 20.7171 75.9626 18.5526 73.0194 18.5526ZM53.3168 32.3167C53.3168 29.7713 51.3776 28.1264 48.8154 27.7976C51.2044 27.2956 53.2999 25.7198 53.2999 23.1575C53.2999 20.3178 51.1009 18.7082 47.0671 18.7251H38.8951C35.1211 18.7251 33.7184 20.2488 33.4241 24.4038L32.9389 31.364C32.6101 36.0386 33.943 37.5102 38.5487 37.5102H46.3742C50.8756 37.5102 53.3168 35.6577 53.3168 32.3159V32.3167ZM45.5947 31.8146C45.5947 33.425 44.3484 34.1868 42.2706 34.1868L40.0678 34.1692C40.0678 34.1692 40.4134 31.902 40.6357 29.6333H42.6515C44.3829 29.6333 45.5947 30.343 45.5947 31.8146ZM45.6813 24.1968C45.6813 25.5818 44.5562 26.4126 42.5649 26.4126H40.9078C40.9078 26.4126 41.0734 23.8872 40.9653 22.0668H42.7895C44.6075 22.0668 45.6805 22.8463 45.6805 24.196L45.6813 24.1968Z" fill="#fff"/><path d="M27.2668 18.5826C25.6051 18.5826 24.2753 19.2472 22.9463 21.2047L17.7765 28.9965L18.2563 22.94C18.4043 20.6505 16.9641 18.5826 14.4156 18.5826C12.0519 18.5826 10.5749 20.1707 10.427 22.2019L9.61453 33.3546C9.42981 36.1246 10.87 37.7119 13.1594 37.7119C15.4488 37.7119 16.889 36.0502 17.9605 34.5357L22.9455 26.9654L22.5025 33.3538C22.281 35.9391 23.6844 37.7111 26.2321 37.7111C28.5959 37.7111 30.1464 36.3078 30.2943 34.2031L31.1068 22.94C31.2915 20.7241 30.2208 18.5826 27.2661 18.5826H27.2668Z" fill="url(#paint1_linear_606_157)"/><path d="M18.2485 22.9453L17.7687 29.0019L17.9527 34.5411C16.8812 36.0556 15.441 37.7173 13.1516 37.7173C10.8622 37.7173 9.422 36.1299 9.60671 33.36L10.4192 22.2072C10.5671 20.1761 12.0441 18.588 14.4078 18.588C16.9563 18.588 18.3965 20.6559 18.2485 22.9453Z" fill="url(#paint2_linear_606_157)"/><path d="M18.2642 22.6242C18.2642 20.5119 16.8984 18.5812 14.3867 18.5812C11.875 18.5812 10.418 20.4644 10.418 22.4955C10.418 24.6745 12.0528 26.373 14.3422 26.373C16.6316 26.373 18.2642 24.8025 18.2642 22.6242Z" fill="#fff"/><defs><linearGradient id="paint0_linear_606_157" x1="44.965" y1="73.64" x2=".021" y2="6.412" gradientUnits="userSpaceOnUse"><stop offset=".798" stopColor="#F30745"/><stop offset=".977" stopColor="#FFBCCE"/></linearGradient><linearGradient id="paint1_linear_606_157" x1="19.513" y1="28.053" x2="11.525" y2="27.039" gradientUnits="userSpaceOnUse"><stop offset=".15" stopColor="#fff"/><stop offset=".62" stopColor="#fff" stopOpacity=".6"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="paint2_linear_606_157" x1="12.146" y1="37.572" x2="14.313" y2="25.753" gradientUnits="userSpaceOnUse"><stop offset=".15" stopColor="#fff"/><stop offset=".62" stopColor="#fff" stopOpacity=".6"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs></svg>
                        </div>
                        <div className="header__headerMenu">
                            <nav className="headerMenu__navigation">
                                <ul className="headerMenu__list">
                                    <li className="headerMenu__listItem">
                                        <a href="https://www.ivi.ru/" title="Мой Иви" className="headerMenu__link">
                                            <p className="headerMenu__text">Мой Иви</p>
                                        </a>
                                    </li>
                                    <li className="headerMenu__listItem">
                                        <a href="https://www.ivi.ru/new" title="Что нового" className="headerMenu__link">
                                            <p className="headerMenu__text">Что нового</p>
                                        </a>
                                    </li>
                                    <li className="headerMenu__listItem">
                                        <a href="" title="Фильмы" className="headerMenu__link">
                                            <p 
                                                className="headerMenu__text"
                                                onMouseOver={hoverListener}
                                                onMouseLeave={leaveListener}
                                            >Фильмы</p>
                                        </a>
                                    </li>
                                    <li className="headerMenu__listItem">
                                        <a href="" title="Сериалы" className="headerMenu__link">
                                            <p 
                                                className="headerMenu__text"
                                                onMouseOver={hoverListener}
                                                onMouseLeave={leaveListener}
                                            >Сериалы</p>
                                        </a>
                                    </li>
                                    <li className="headerMenu__listItem">
                                        <a href="" title="Мультфильмы" className="headerMenu__link">
                                            <p 
                                                className="headerMenu__text"
                                                onMouseOver={hoverListener}
                                                onMouseLeave={leaveListener}
                                            >Мультфильмы</p>
                                        </a>
                                    </li>
                                    <li className="headerMenu__listItem">
                                        <a href="" title="TV+" className="headerMenu__link">
                                            <p 
                                                className="headerMenu__text"
                                                onMouseOver={hoverListener}
                                                onMouseLeave={leaveListener}
                                            >TV+</p>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="header__block">
                        <div 
                            className="header__btn-block"
                            onMouseOver={hoverListener}
                            onMouseLeave={leaveListener}
                        >
                            <Button 
                                title={['Смотреть 30 дней за 1 ₽']} 
                                color="red"
                                onClick={function() {window.location.href = 'https://www.ivi.ru/subscribe'}}
                            />   
                        </div>
                        <div className="header__btn-block header__btn-block_search">
                            <Icons className="header__svg header__svg_search" name='search' color='gray' size='20' strokeWidth="2"/>
                            <p className="header__text">Поиск</p>
                        </div>
                        <div 
                            className="header__btn-block header__btn-block_notification"
                            onMouseOver={hoverListener}
                            onMouseLeave={leaveListener}
                        > 
                            <Icons className="header__svg header__svg_notification" name='notification' color='#fff' size='16'/>
                        </div>
                        <div 
                            className="header__btn-block header__btn-block_login"
                            onMouseOver={hoverListener}
                            onMouseLeave={leaveListener}
                        >
                            <div className="header__svg-border">
                                <Icons className="header__svg header__svg_login" name='person' color='#fff' size='20' strokeWidth="3"/> 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className="header__dropDownBody header__dropDownBody_hidden"
                id='drop-down-block'
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
    </div>
}

export default Header;