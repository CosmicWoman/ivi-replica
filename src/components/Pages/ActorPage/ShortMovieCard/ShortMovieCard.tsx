import React, {FC, PropsWithChildren} from 'react';
import Button from "../../../UI/Buttons/Button/Button";
import './ShortMovieCard.scss'
import {FilmographyProps} from "../../../../types/filtersTypes";
import {useTranslation} from "react-i18next";
import poster from "../../../../static/img/filmcard/poster.png";

interface ShortMovieCardProps{
    film: FilmographyProps,
    route: (film: FilmographyProps) => void
}

const ShortMovieCard: FC<PropsWithChildren<ShortMovieCardProps>> = ({film, route}) => {
    const {t, i18n} = useTranslation();

    let strRating = film.rating.toString().replace('.', ',')

    return (
        <div data-testid='shortMovieCard'
             className="shortMovieCard">
            <div className="shortMovieCard__container">
                <div className="shortMovieCard__content">

                    <div className="shortMovieCard__movie">
                        <div className="shortMovieCard__poster">
                            <img src={film.poster ? film.poster : poster} alt=""/>
                        </div>
                        <div className="shortMovieCard__specification specification">
                            <div className="specification__year">
                                {film.year}
                            </div>
                            <div className="specification__name">
                                {i18n.language === 'en' && film.nameEn ? film.nameEn : film.nameRu}
                            </div>
                            <div className="specification__rating">
                                {t('personPage.rating')}: {strRating}
                            </div>

                        </div>
                    </div>
                    <div className="shortMovieCard__button">
                        <Button title={[t('personPage.btn-film')]}
                                onClick={()  => route(film)}
                        />
                    </div>

                </div>
            </div>

            <div className="shortMovieCard__mobile">
                <div className="shortMovieCard__poster">
                    <img src={film.poster ? film.poster : poster} alt=""/>
                </div>

                <div className="shortMovieCard__info">
                    <div className="shortMovieCard__year">
                        {film.year}
                    </div>
                    <div className="shortMovieCard__name">
                        {i18n.language === 'en' && film.nameEn ? film.nameEn : film.nameRu}
                    </div>
                    <div className="shortMovieCard__rating">
                        {t('personPage.rating')}: {strRating}
                    </div>
                    <div className="shortMovieCard__button">
                        <Button
                            type={'ultraWide'}
                            title={[t('personPage.btn-film')]}
                            onClick={()  => route(film)}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShortMovieCard;