import React, { useState } from "react";
import './Footer.scss'
import Button from "../UI/Buttons/Button/Button";
import Icons from "../Icons/Icons";
import OpenUrl from "../../hooks/OpenUrl";

import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import HeaderSearch from "../Header/HeaderSearch/HeaderSearch";

const Footer = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [btnPhoneStatus, setBtnPhoneStatus] = useState(false);
    function showPhoneNumber () {

        const btnPhone = document.querySelector('#phoneButton');
        const askBlock = document.querySelector('#askBlock');

        setBtnPhoneStatus(!btnPhoneStatus);

        switch(btnPhoneStatus) {
            case true:
                btnPhone?.classList.add('footer__buttons_hidden');
                askBlock?.classList.remove('footer__ask_hidden');
                break;
            case false:
                btnPhone?.classList.remove('footer__buttons_hidden');
                askBlock?.classList.add('footer__ask_hidden');
                break;
        };
    };

        //Открытие блока поиска
        const searchSection = React.useRef() as React.MutableRefObject<HTMLDivElement>;

        function toggleSearchSection (e: React.MouseEvent<HTMLDivElement>) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            searchSection.current.classList.toggle('searchBlock__hidden');
    
            if ( e.currentTarget.className.includes('footer__search')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            };
        };

    return (
        <div className="footer" data-testid='footer'>
            <div className="container footer__container">
                <div className="footer__content">
                    <div className="footer__column">
                        <h3 className="footer__heading">{t('footer.aboutUs')}</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="https://corp.ivi.ru/" className="footer__link">
                                    <p className="footer__text">{t('footer.aboutCompany')}</p>
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="https://corp.ivi.ru/career/#career-vacancy-block" className="footer__link">{t('footer.vacancies')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/pages/beta" className="footer__link">{t('footer.test')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/info/partners" className="footer__link">{t('footer.partners')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://corp.ivi.ru/advertisers/" className="footer__link">{t('footer.adv')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/info/agreement" className="footer__link">{t('footer.usingTerms')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/info/confidential" className="footer__link">{t('footer.confidential')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/info/goryachaya-liniya-komplaens" className="footer__link">{t('footer.compliance')}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h3 className="footer__heading">{t('footer.sections')}</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a className="footer__link"
                                    data-testid='footer-mainPageLink'
                                    onClick={() => navigate (`/movies-website/`)}
                                >
                                    {t('footer.myIvi')}</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/new" className="footer__link">{t('footer.new')}</a>
                            </li>
                            <li className="footer__item">
                                <div className="footer__link"
                                    data-testid='footer-moviesPageLink'
                                    onClick={() => navigate('/movies-website/films/')}
                                >
                                    {t('footer.films')}
                                </div>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/series" className="footer__link">{t('footer.series')}</a>
                            </li>
                            <li className="footer__item">
                                <a className="footer__link"
                                    onClick={() => navigate (`/movies-website/films/genre/мультфильм`)}
                                >
                                    {t('footer.mults')}
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/tvplus" className="footer__link">TV+</a>
                            </li>
                            <li className="footer__item">
                                <a href="https://www.ivi.ru/goodmovies" className="footer__link">{t('footer.see')}</a>
                            </li>
                        </ul>
                        <div className="footer__certificateLinkWrapper">
                            <a href="https://www.ivi.ru/cert" className="footer__link footer__cretificateLink">{t('footer.sert')}</a>
                        </div>
                    </div>
                    <div className="footer__column">
                        <h3 className="footer__heading">{t('footer.support')}</h3>
                        <p className="footer__text">{t('footer.ready')}</p>
                        <p className="footer__text">{t('footer.online')}</p>
                        <div className="footer__buttons">
                            <Button 
                                title={['button.footer.chat']}
                                onClick={() => OpenUrl('https://www.ivi.ru/profile')}
                            />
                        </div>
                        <div className="footer__buttons">
                            <Button 
                                svg={<Icons name='mail' color='#fff' size='20' strokeWidth='2'/>}
                                onClick={() => OpenUrl('mailto:support@ivi.ru')}
                            />
                            <Button 
                                svg={<Icons name='phone' color='#fff' size='20'/>}
                                onClick={showPhoneNumber}
                            />
                        </div>
                        <div className="footer__buttons footer__buttons_anim footer__buttons_hidden" id='phoneButton'>
                            <Button 
                                title={['+7 343 226-92-20']}
                                onClick={() => OpenUrl('tel:+73432269220')}
                            />
                        </div>
                        <div className="footer__ask" id='askBlock'>
                            <a href="https://ask.ivi.ru/" className="footer__link">
                                <p className="footer__text footer__text_additional">ask.ivi.ru</p>
                            </a>
                            <p className="footer__text">{t('footer.answers')}</p>    
                        </div>
                    </div>
                    <a className="footer__column" href="https://www.ivi.ru/subscribe">
                        <div className="footer__bigButton">
                            <Icons name='mute' color='#fff' size='56'/>
                        </div>
                        <p className="footer__text footer__text_bigButton">{t('footer.info')}</p>
                    </a>
                </div>
                <div className="footer__content">
                    <div className="footer__column footer__column_wide">
                        <div className="footer__stores">
                            <Button 
                                svg={<Icons name='apple' color='#fff' size='20'/>}
                                title={["button.footer.app", 'App Store']}
                                onClick={() => OpenUrl('https://apps.apple.com/RU/app/id455705533?mt=8')}
                            />
                            <Button
                                svg={<Icons name='google' color='#fff' size='20'/>}
                                title={['button.footer.gplay', 'Google Play']}
                                onClick={() => OpenUrl('https://play.google.com/store/apps/details?id=ru.ivi.client')}
                            />
                            <Button 
                                svg={<Icons name='smartTV' color='#fff' size='20'/>}
                                title={['button.footer.smart', 'Smart TV']}
                                onClick={() => OpenUrl('https://www.ivi.tv/pages/tvsmart/')}
                            />
                            <Button 
                                svg={<Icons name='devices' color='#fff' size='22'/>}
                                title={["button.footer.all"]}
                                onClick={() => OpenUrl('https://www.ivi.tv/devices')}
                            />
                        </div>
                        <div className="footer__copyrights">
                            <p className="footer__text_copyrights">
                                <span>©&nbsp;</span>
                                <span>2023</span>
                                <span>&nbsp;{t('footer.ivi')}</span>
                            </p>
                            <p className="footer__text footer__text_copyrights">HBO ® and related service marks are the property of Home Box Office, Inc</p>
                        </div>
                    </div>
                    <div className="footer__column footer__column_wide">
                        <div className="footer__community">
                            <a className="footer__communityLink" href="https://vk.com/iviru?crc=fa4448c13e06e69ba9e814e8743c7e2e" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='vkontakte' color='#fff' size='20'/>
                                </div>
                            </a>
                            <a className="footer__communityLink" href="https://ok.ru/ivi.ru" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='odnoklasniki' color='#fff' size='20'/>
                                </div>
                            </a>
                            <a className="footer__communityLink" href="https://twitter.com/ivi_ru" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='twitter' color='#fff' size='20'/>
                                </div>
                            </a>
                            <a className="footer__communityLink"  href="https://vb.me/a0544c" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='viber' color='#fff' size='20' strokeWidth="0"/>
                                </div>
                            </a>
                            <a className="footer__communityLink" href="https://www.linkedin.com/company/2543415/" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='linkedin' color='#fff' size='20'strokeWidth="0"/>
                                </div>
                            </a>
                            <a className="footer__communityLink" href="https://t.me/official_iviru" target="_blank" rel="noreferrer">
                                <div className="footer__icon-block">
                                    <Icons className="footer__icon" name='telegram' color='#fff' size='20'strokeWidth="0"/>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__mobile">
                <div className="container footer__mobile-container">
                        <div className="footer__copyrights footer__copyrights_mobile">
                            <p className="footer__mobile-text">HBO ® and related service marks are the property of Home Box Office, Inc</p>
                        </div>
                </div>
                <div className="footer__bottom-bar">
                    <ul className="footer__mobile-list">
                        <li className="footer__mobile-item" onClick={() => navigate (`/movies-website/`)}>
                            <Icons name="home" size='20' color="#a5a1b2"/>
                            <h5 className="footer__mobile-heading">{t('footer.myIvi')}</h5>
                        </li>
                        <li className="footer__mobile-item" onClick={() => navigate('/movies-website/films/')}>
                            <Icons name="devices" size='20' color="#a5a1b2" />
                            <h5 className="footer__mobile-heading">{t('footer.catalog')}</h5>
                        </li>
                        
                        <li className="footer__mobile-item" >
                            <div className="footer__search" onClick={toggleSearchSection}>
                                <Icons name="search" size="20" color="#a5a1b2"/>
                                <h5 className="footer__mobile-heading">{t('footer.search')}</h5>
                            </div>
                        </li>

                        <li className="footer__mobile-item" onClick={() => OpenUrl('https://www.ivi.ru/series')}>
                            <Icons name="tv" size='20' color="#a5a1b2" />
                            <h5 className="footer__mobile-heading">TV+</h5>
                        </li>
                        <li className="footer__mobile-item" onClick={() => OpenUrl('https://www.ivi.ru/')}>
                            <div className="footer__svg-block">
                                <Icons name="circle-flooded" size='5' color="#a5a1b2" />
                                <Icons name="circle-flooded" size='5' color="#a5a1b2" className="footer__svg footer__svg_circle-center"/>   
                                <Icons name="circle-flooded" size='5' color="#a5a1b2" />       
                            </div>
                            <h5 className="footer__mobile-heading">{t('footer.more')}</h5>
                        </li>
                    </ul>
                </div>
            </div>
            <HeaderSearch 
                searchSection={searchSection} 
                toggleSearchSection={toggleSearchSection}
                /> 
        </div>
    );
};

export default Footer;