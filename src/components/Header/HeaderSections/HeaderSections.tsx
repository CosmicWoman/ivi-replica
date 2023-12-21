import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HeaderSectionsProps } from "../../../types/headerTypes";
import './HeaderSections.scss';

import Button from "../../UI/Buttons/Button/Button";
import Icons from "../../Icons/Icons";
import OpenUrl from "../../../hooks/OpenUrl";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const HeaderSections:FC<HeaderSectionsProps> = ({hoverListener, leaveListener, toggleSearchSection}) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const login = useTypedSelector(state => state.auth.isAuth);

    return (
        <div className="headerSections">

            <div className="headerSections__block">

                <div className="headerSections__img" >
                    <img data-testid='mainPageLink'
                        className="headerSections__logo_ivi"
                        src='https://solea-parent.dfs.ivi.ru/picture/ea003d,ffffff/reposition_iviLogoPlateRounded.svg' 
                        alt="Логотип Иви" 
                        onClick={() => navigate (`/movies-website/`)}/>
                </div>

            
                <div className="headerSections__headerMenu">
                    <nav className="headerMenu__navigation">
                        <ul className="headerMenu__list">

                            <li className="headerMenu__listItem">
                                <a onClick={() => navigate (`/movies-website/`)} title="Мой Иви" className="headerMenu__link">
                                    <p className="headerMenu__text">{t('header.myIvi')}</p>
                                </a>
                            </li>

                            <li className="headerMenu__listItem">
                                <a href="https://www.ivi.ru/new" title="Что нового" className="headerMenu__link">
                                    <p className="headerMenu__text">{t('header.new')}</p>
                                </a>
                            </li>

                            <li className="headerMenu__listItem">
                                <a 
                                    title="Фильмы" 
                                    className="headerMenu__link"
                                    onClick={() => navigate (`/movies-website/films/`)}
                                    data-testid='moviesPageLink'
                                >
                                    <p 
                                        className="headerMenu__text"
                                        onMouseOver={hoverListener}
                                        onMouseLeave={leaveListener}
                                    >{t('header.films')}</p>
                                </a>
                            </li>

                            <li className="headerMenu__listItem"  >
                                <a href="https://www.ivi.ru/series" title="Сериалы" className="headerMenu__link">
                                    <p 
                                        className="headerMenu__text"
                                        onMouseOver={hoverListener}
                                        onMouseLeave={leaveListener}
                                        data-testid='headerSeriesSection'
                                    >{t('header.series')}</p>
                                </a>
                            </li>

                            <li className="headerMenu__listItem">
                                <a 
                                    title="Мультфильмы" 
                                    className="headerMenu__link"
                                    onClick={() => navigate (`/movies-website/films/genre/мультфильм`)}
                                >
                                    <p 
                                        className="headerMenu__text"
                                        onMouseOver={hoverListener}
                                        onMouseLeave={leaveListener}
                                    >{t('header.mults')}</p>
                                </a>
                            </li>

                            <li className="headerMenu__listItem">
                                <a href="https://www.ivi.ru/tvplus" title="TV+" className="headerMenu__link">
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

            <div className="headerSections__block">

                <div 
                    className="headerSections__btn-block"
                    onMouseOver={hoverListener}
                    onMouseLeave={leaveListener}
                >
                    <Button 
                        title={['button.header.menuSubscribe.adv']} 
                        color="red"
                        onClick={() => OpenUrl('https://www.ivi.ru/subscribe')}
                    />   
                </div>

                <div 
                    className="headerSections__btn-block headerSections__btn-block_search"
                    onClick={toggleSearchSection}
                    data-testid='headerSerch'
                >
                    <Icons className="headerSections__svg headerSections__svg_search" name='search' color='gray' size='20' strokeWidth="2"/>
                    <p className="headerSections__text">{t('header.search')}</p>
                </div>

                <div 
                    className="headerSections__btn-block headerSections__btn-block_notification"
                    onMouseOver={hoverListener}
                    onMouseLeave={leaveListener}
                    onClick={() => OpenUrl('https://www.ivi.ru/profile/pull_notifications')}
                > 
                    <Icons className="headerSections__svg headerSections__svg_notification" name='notification' color='#fff' size='16'/>
                </div>

                <div 
                    className="headerSections__btn-block headerSections__btn-block_login"
                    onMouseOver={hoverListener}
                    onMouseLeave={leaveListener}
                    onClick={() => navigate (`/movies-website/auth/`)}
                >
                    <div className="headerSections__svg-border">
                        { (!login) && <Icons className="headerSections__svg headerSections__svg_login" 
                                            name='person' 
                                            color='#fff' 
                                            size='20' 
                                            strokeWidth="3"/>
                        }
                        { (login) && <Icons className="headerSections__svg headerSections__svg_login" 
                                            name='personFull' 
                                            color='#fff' 
                                            size='20' 
                                            strokeWidth="3"/>
                        } 
                    </div> 
                </div>
                
            </div>

        </div>
    );
};

export default HeaderSections;
