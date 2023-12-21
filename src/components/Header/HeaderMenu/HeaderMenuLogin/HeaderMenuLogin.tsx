import React, { FC, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { HeaderMenuProps } from "../../../../types/headerTypes";
import { useNavigate } from "react-router-dom";
import './HeaderMenuLogin.scss'

import Icons from "../../../Icons/Icons";
import Button from "../../../UI/Buttons/Button/Button";
import HeaderActiveList from "../../HeaderActiveList/HeaderActiveList";
import Tile from "../../../UI/Buttons/Tile/Tile";

import OpenUrl from "../../../../hooks/OpenUrl";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/reducers/authReducer";

const HeaderMenuLogin:FC<HeaderMenuProps> = ({id}) => {
    const hoverActiveListData = [
        [0, 'header.menuLogin.activeList.easy', "https://www.ivi.ru/profile/subscription-izi-ivi"],
        [1, 'header.menuLogin.activeList.ivi', 'https://www.ivi.ru/profile/subscription'],
        [2, 'header.menuLogin.activeList.iviAmedia', "https://www.ivi.ru/profile/subscription-ivi-amediateka"],
        [3, 'header.menuLogin.activeList.amediateka', "https://www.ivi.ru/profile/subscription-amediateka"],
        [4, 'header.menuLogin.activeList.premier', "https://www.ivi.ru/profile/subscription-matchpremier"],
        [5, 'header.menuLogin.activeList.football', "https://www.ivi.ru/profile/subscription-matchfootball"]
    ];

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const login = useTypedSelector(state => state.auth.isAuth);
    const admin = useTypedSelector(state => state.auth.isAdmin);
    const mail = useTypedSelector(state => state.auth.user.email);
    const [nickName, setNickName] = useState(mail?.split('@')[0].slice(0,10));

    useEffect( () => {
        setNickName(mail?.split('@')[0].slice(0,10))
    }, [login])

    const [activeHover, setActiveHover] = useState<string>('ivi');
    let imgUrl = 'https://www.ivi.ru/pages/newseason/assets/images/new-logo-short.svg'
    switch(activeHover) {
        case 'amediateka':
            imgUrl = 'https://toplogos.ru/images/logo-amediateka.png';
            break;
        case 'match':
            imgUrl = 'https://upload.wikimedia.org/wikipedia/ru/4/4d/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%D0%B0_%D0%9C%D0%B0%D1%82%D1%87_%D0%A2%D0%92.svg'
            break;
    };

    const passiveBlock = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const activeBlock = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const [blockStatus, setBlockStatus] = useState (false);

    function openBlock(e: React.DragEvent<HTMLDivElement>) {
        setBlockStatus(true);
    };

    function closeBlock(e: React.DragEvent<HTMLDivElement>) {
        if(blockStatus) {
            setBlockStatus(false);
        };
    };

    useEffect( () => {
        if (blockStatus) {
            passiveBlock.current.classList.add('headerMenuLogin__hidden')
            activeBlock.current.classList.remove('headerMenuLogin__hidden')  
        } else {
            passiveBlock.current.classList.remove('headerMenuLogin__hidden')
            activeBlock.current.classList.add('headerMenuLogin__hidden')  
        }
    },[blockStatus])


    return (
        <div className="headerMenuLogin headerMenuLogin__hidden" id={id} onMouseLeave={closeBlock}>
            
            <div className="headerMenuLogin__column" >

                <div className="headerMenuLogin__line">

                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.buy')}
                            svg={<Icons className="headerMenuLogin__svg" name='devices' color='#b0afb1' size='20' strokeWidth="2"/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile/purchases')}
                        />   
                    </div>

                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.later')}
                            svg={<Icons className="headerMenuLogin__svg" name='bookmark' color='#b0afb1' size='20'/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile/favorites')}
                        />   
                    </div>

                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.history')}
                            svg={<Icons className="headerMenuLogin__svg" name='history' color='#b0afb1' size='20'/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile/watched')}
                        />   
                    </div>

                    <div 
                        className="headerMenuLogin__block headerMenuLogin__block_card"
                        onMouseOver={openBlock}
                        onClick={()=>OpenUrl('https://www.ivi.ru/profile/subscriptions')
                    }>

                        <div className="headerMenuLogin__inner headerMenuLogin__inner_top">
                            <Icons className="headerMenuLogin__svg"  name='brilliant' color='#b0afb1' size='20' strokeWidth="0"/>
                            <Icons className="headerMenuLogin__svg headerMenuLogin__svg_circle" name='circle-flooded' color='red' size='10'/>   
                        </div>

                        <div className="headerMenuLogin__inner headerMenuLogin__inner_bottom">
                            <p className="headerMenuLogin__text ">{t('header.menuLogin.subs')}</p>
                            <p className="headerMenuLogin__text headerMenuLogin__text_small">{t('header.menuLogin.plug')}</p>
                        </div>

                    </div>
                </div>

                <div className="headerMenuLogin__line">
                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.sert')}
                            svg={<Icons className="headerMenuLogin__svg" name='medal' color='#b0afb1' size='20' strokeWidth="0"/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile')}
                        />   
                    </div>
                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.enter')}
                            svg={<Icons className="headerMenuLogin__svg" name='tv' color='#b0afb1' size='20' strokeWidth="2"/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile')}
                        />   
                    </div>
                    <div className="headerMenuLogin__block" onMouseOver={closeBlock} >
                        <Tile 
                            title={t('tile.headerMenuLogin.ways')}
                            svg={<Icons className="headerMenuLogin__svg" name='card' color='#b0afb1' size='20'/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile/cards')}
                        />   
                    </div>
                    <div className="headerMenuLogin__block">
                        <Tile 
                            title={t('tile.headerMenuLogin.share')}
                            svg={<Icons className="headerMenuLogin__svg" name='share' color='#b0afb1' size='20' strokeWidth="2"/>}
                            onClick={()=>OpenUrl('https://www.ivi.ru/profile/referral')}
                        />   
                    </div>
                </div>

            </div>

            <div className="headerMenuLogin__column headerMenuLogin__column_right">

                <div className=" headerMenuLogin__passiveBlock headerMenuLogin__hidden" ref={passiveBlock}>
                   { (!login) && <Button 
                        title={['button.header.menuLogin.enter']} 
                        color="red" 
                        type="ultraWide"
                        onClick={() => navigate (`/movies-website/auth/`)}
                    />}
                    { (login) && 
                    <div>
                        <p className="headerMenuLogin__heading headerMenuLogin__heading_small">
                            {t('header.menuLogin.welcome')}, {nickName} !
                            </p>
                        <Button 
                            title={['header.menuLogin.logout']} 
                            color="red" 
                            type="ultraWide"
                            onClick={() => dispatch(logout())}
                        />
                    </div>}
                    <div>
                        { (admin) && <a className=" headerMenuLogin__link" onClick={() => navigate(`/movies-website/admin`)}>
                            <p className="headerMenuLogin__text headerMenuLogin__text_additional">
                                {t('header.menuLogin.admin')}
                            </p>
                        </a>}
                        <a className=" headerMenuLogin__link" href="https://www.ivi.ru/profile/settings">
                            <p className="headerMenuLogin__text headerMenuLogin__text_additional">{t('header.menuLogin.settings')}</p>
                        </a>
                        <a className=" headerMenuLogin__link" href="https://ask.ivi.ru/">
                            <p className="headerMenuLogin__text headerMenuLogin__text_additional">{t('header.menuLogin.help')}</p>
                        </a>
                    </div>
                </div>

                <div 
                    className="headerMenuLogin__activeBlock "
                    ref={activeBlock}
                >

                    <div className="headerMenuLogin__internal">
                        <p className="headerMenuLogin__heading">{t('header.menuLogin.subs')}</p>
                        <HeaderActiveList dataArray={hoverActiveListData} prefixForId="HeaderMenuLogin" onHoverChange={setActiveHover}/>
                    </div>

                    <div className="headerMenuLogin__image-block">
                        <img className='headerMenuLogin__logo' src={imgUrl} alt="Логотип выбранной подписки"></img>
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default HeaderMenuLogin;