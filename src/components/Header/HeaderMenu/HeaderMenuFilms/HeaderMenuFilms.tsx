import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { HeaderMenuFilmsAllFiltresProps, HeaderMenuProps } from "../../../../types/headerTypes";
import './HeaderMenuFilms.scss';

import HeaderAdvertise from "../../HeaderAdvertise/HeaderAdvertise";
import HeaderActiveList from "../../HeaderActiveList/HeaderActiveList";

import CreateList from "../../../CreateList/CreateList";

const HeaderMenuFilms:FC<HeaderMenuProps> = ({id}) => {
    const hoverActiveListData = [
        [0, 'header.menuFilms.activeList.new', "https://www.ivi.ru/new/movie-new"],
        [1, 'header.menuFilms.activeList.collect', 'https://www.ivi.ru/collections'],
        [2, 'header.menuFilms.activeList.reit', "https://www.ivi.ru/movies/all?ivi_rating_10_gte=7&sort=ivi&rating_part=main&rating_model=ready"],
        [3, 'header.menuFilms.activeList.soon', 'https://www.ivi.ru/new/soon-ivi'],
        [4, 'header.menuFilms.activeList.trailers', 'https://www.ivi.ru/trailers'],
        [5, 'header.menuFilms.activeList.see', 'https://www.ivi.ru/goodmovies'],
        [6, 'header.menuFilms.activeList.hd', 'https://www.ivi.ru/collections/movies-hd'],
        [7, 'header.menuFilms.activeList.choice', 'https://www.ivi.ru/collections/vyibor-ivi'],
        [8, 'header.menuFilms.activeList.newSub', 'https://www.ivi.ru/collections/very-new-svod?sort=priority_in_collection'],
        [9, 'header.menuFilms.activeList.amedia', 'https://www.ivi.ru/collections/filmyi-amediateka'],
        [10, 'header.menuFilms.activeList.popular', 'https://www.ivi.ru/collections/best-movies'],
        [11, 'header.menuFilms.activeList.iviFilms', 'https://www.ivi.ru/collections/ivi-originals']
    ];

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [headerAdvertiseProp, setHeaderAdvertiseProp] = useState('ivi');

    const [ allFiltres, setAllFiltres] = useState<HeaderMenuFilmsAllFiltresProps>(
        {
            genresFirst:[ {nameRu:'', nameEn: ''  } ],
            genresSecond:[ {nameRu:'', nameEn: ''  } ],
            years:[]
        }
    );

    async function fetchFiltres() {
        const response = await axios.get('http://localhost:5000/filters')

        const filters_ = {
            genresFirst: response.data.genres.slice (0 , response.data.genres.length / 2 ),
            genresSecond: response.data.genres.slice ( (response.data.genres.length / 2), response.data.genres.length ),
            years: response.data.years.reverse().slice( 1 , 6 )
        };

        setAllFiltres(filters_);
    };

    useEffect( () => {
        fetchFiltres();
    }, [])

    return(
        <div className="headerMenuFilms" id={id} data-testid='headerMoviesBlock'>

            <div className="headerMenuFilms__column">

                <h3 className="headerMenuFilms__heading">{t('header.menuFilms.genres')}</h3>

                <ul className="headerMenuFilms__list">

                    <div className="headerMenuFilms__column">
                        <CreateList items={allFiltres.genresFirst} renderItem={filter =>
                            <p key={filter.nameEn } className="headerMenuFilms__item" onClick={() => navigate(`/movies-website/films/genre/${filter.nameRu}`)}>
                                {i18n.language === 'en' ? [filter.nameEn || filter.nameRu] : [filter.nameRu]}
                            </p>
                        } />
                    </div>

                    <div className="headerMenuFilms__column">
                        <CreateList items={allFiltres.genresSecond} renderItem={filter =>
                            <p key={filter.nameEn } className="headerMenuFilms__item" onClick={() => navigate(`/movies-website/films/genre/${filter.nameRu}`)}>
                                {i18n.language === 'en' ? [filter.nameEn || filter.nameRu] : [filter.nameRu]}
                            </p>
                        }/>
                    </div>

                </ul>
            </div>

            <div className="headerMenuFilms__column">

                <h3 className="headerMenuFilms__heading">{t('header.menuFilms.countres')}</h3>
                <ul className="headerMenuFilms__list">
                    <div className="headerMenuFilms__column">

                        <a
                            className="headerMenuFilms__link"
                            onClick={() => navigate (`/movies-website/films/country/Россия`)}
                        >
                            <p className="headerMenuFilms__item">{t('header.menuFilms.russian')}</p>
                        </a>

                        <a
                            className="headerMenuFilms__link"
                            onClick={() => navigate (`/movies-website/films/country/СССР`)}
                        >
                            <p className="headerMenuFilms__item">{t('header.menuFilms.ussr')}</p>
                        </a>

                        <a
                            className="headerMenuFilms__link"
                            onClick={() => navigate (`/movies-website/films/country/США`)}
                        >
                            <p className="headerMenuFilms__item">{t('header.menuFilms.abroad')}</p>
                        </a>
                    </div>

                </ul>

                <h3 className="headerMenuFilms__heading">{t('header.menuFilms.years')}</h3>
                <ul className="headerMenuFilms__list">
                    <div className="headerMenuFilms__column">
                        <CreateList items={allFiltres.years} renderItem={filter =>
                            <p key={filter } className="headerMenuFilms__item" onClick={() => navigate(`/movies-website/films/year/${filter}`)}>
                                {t(`header.menuFilms.${filter}`)}
                            </p>
                        } />
                    </div>
                </ul>

            </div>

            <div className="headerMenuFilms__block">
                <HeaderActiveList dataArray={hoverActiveListData} prefixForId="HeaderMenuFilms" onHoverChange={setHeaderAdvertiseProp}/>
            </div>

            <HeaderAdvertise variant={headerAdvertiseProp}/>

        </div>
    );
};

export default HeaderMenuFilms;