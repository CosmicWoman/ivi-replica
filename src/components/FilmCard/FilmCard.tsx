import React, {FC, PropsWithChildren, useState} from 'react';
import './filmcard.scss'
import similar from '../../static/img/filmcard/similar.svg'
import like from '../../static/img/filmcard/notlike.svg'
import notlikeTrue from '../../static/img/filmcard/notlike-true2.svg'
import poster from '../../static/img/filmcard/poster.png'
import Icons from "../Icons/Icons";
import {useTranslation} from "react-i18next";
import {FilmProps} from "../../types/filtersTypes";
import CreateEnd from "../UI/CreateEnding/CreateEnd";
import { useDispatch } from 'react-redux';
import { gradeTrue } from '../../store/reducers/gradeReducer';


interface FilmCardProps {
    film: FilmProps;
    onClick: (film: FilmProps) => void;
    icons?: boolean
}

const FilmCard: FC<PropsWithChildren<FilmCardProps>> = ({film, onClick, icons = false}) => {
    const {t, i18n} = useTranslation();
    const [favorites, setFavorites] = useState(true);
    const [notlike, setNotlike] = useState(true);
    let ratingArr = film.rating.toFixed(1).toString().split('.')

    const dispatch = useDispatch();
    const onIncrement = () => {
        dispatch(gradeTrue())
    }

    return (
        <div
            className='filmcard'
            key={film.key}
        >
            <div className="filmcard__container">
                <div className='filmcard__content'>
                    <div className={icons ? 'filmcard__poster' : 'filmcard__poster-two'}
                         onClick={() => onClick(film)}
                    >
                        <div className="filmcard__img">
                            <img data-testid='film-card-img'
                                 src={film.poster ? film.poster : poster}
                                 alt=""/>
                            <div className="filmcard__img_background"></div>
                        </div>
                    </div>
                    <div className='filmcard__properties'>
                        <div className="filmcard__icons">

                            <div data-testid='film-card-favorites'
                                 data-title={t('filmCard.data-title.watch')}
                                 className="filmcard__icons_style"
                                 onClick={() => setFavorites(prev => !prev)}>

                                {favorites ? <Icons className='filmcard__icons_svg' name='bookmark' size='25.8'/>
                                    : <Icons className='filmcard__icons_svg' name='bookmark-true' size='25.8'/>
                                }

                            </div>

                            {icons &&
                                <div data-testid='icons'>
                                    <div className="filmcard__icons_style"
                                         data-title={t('filmCard.data-title.similar')}
                                    >
                                        <img src={similar} alt="" style={{width: 20.8}}/>
                                    </div>

                                    <div className="filmcard__icons_style"
                                         data-title={t('filmCard.data-title.already')}
                                         onClick={onIncrement}
                                    >
                                        <Icons className='filmcard__icons_svg' name='grade-star' size='25.8'/>
                                    </div>

                                    <div
                                        data-title={t('filmCard.data-title.notLike')}
                                        className="filmcard__icons_style"
                                        onClick={() => setNotlike(prev => !prev)}
                                    >
                                        {notlike ? <img src={like} alt='' style={{width: 20.8}}/>
                                            : <img src={notlikeTrue} alt='' style={{width: 20.8}}/>}
                                    </div>
                                </div>}

                        </div>
                        <div data-testid='film-card-info'
                             className="filmcard__properties_info">
                            <div className="filmcard__properties_rating">
                                <div className="filmcard__properties_bigRating">{ratingArr[0] + ','}</div>
                                <div className="filmcard__properties_smallRating">{ratingArr[1]}</div>
                            </div>
                            <div className="filmcard__properties_infoShort">{film.year ? (film.year + ', ') : ''}{i18n.language === 'en' ? film.countryEn : film.countryRu}, {i18n.language === 'en' ? film.genreEn : film.genreRu}</div>
                            <div className="filmcard__properties_infoTime">
                                {film.filmLength &&
                                    <CreateEnd number={film.filmLength} wordOne='минута' wordTwo='минут' wordThree='минуты' wordEn='minutes'/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filmcard__name">{i18n.language === 'en' && film.nameEn ? film.nameEn : film.nameRu}</div>
            </div>
        </div>
    );
};

export default FilmCard;