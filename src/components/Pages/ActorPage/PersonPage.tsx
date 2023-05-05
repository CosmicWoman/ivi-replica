import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShortMovieCard from "./ShortMovieCard/ShortMovieCard";
import {ActorPageProps, FilmographyProps} from "../../../types/testCase";
import PersonHeader from "./PersonHeader/PersonHeader";
import Filmography from "./FilmographyFiltrs/Filmography";
import './PersonPage.scss'
import Icons from "../../Icons/Icons";
import axios from "axios";
import {useTranslation} from "react-i18next";
import CreateList from "../../CreateList/CreateList";

const Person = {
    id: 0,
    nameRu: '',
    nameEn: '',
    photo: '',
}

const PersonPage = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate()
    const params = useParams()
    const [person, setPerson] = useState<ActorPageProps>(Person)
    const [films, setFilms] = useState<FilmographyProps[]>([])
    const [subtitle, setSubtitle] = useState('')

    useEffect(() => {
        fetchPerson()
    }, [])

    useEffect(() => {
        createSubtitle()
    }, [i18n.language])

    async function fetchPerson() {
        const response = await axios.get(`http://localhost:5000/person/${params.id}`)

        let data = response.data

        const person_ = {
            id: data.id,
            nameRu: data.nameRu,
            nameEn: data.nameEn,
            photo: data.photoUrl,
        }

        // @ts-ignore
        const films_ = data.films.map(item => {
            return {
                key: item.id,
                poster: item.smallPictureUrl,
                nameRu: item.filmNameRu,
                nameEn: item.filmNameEn,
                year: item.year,
                rating: item.ratingKp.toFixed(1),
            }
        })

        setPerson(person_)
        setFilms(films_)
    }

    function createSubtitle() {
        if (i18n.language === 'ru' && person.nameEn) {
            return setSubtitle(person.nameEn)
        }
        if (i18n.language === 'ru' && !person.nameEn) {
            return setSubtitle('')
        }
        if (i18n.language === 'en') {
            return setSubtitle(person.nameRu)
        }
    }

    return (
        <div className="actorPage">
            <div className="actorPage__container">
                <div className="actorPage__content">

                    <div className="actorPage__btn-back btn-back">
                        <Icons className='actorPage__arrow_small' name='back' size='40'/>
                        <Icons className='actorPage__arrow_big' name='back' size='50'/>
                        {t('personPage.btn-back')}
                    </div>

                    <PersonHeader person={person}/>

                    <div className="actorPage__filmography">
                        <Filmography movies={films.length}/>
                        {/*todo: как будет готов эндпоинт с фильмами, проставить корректый navigate*/}

                        <CreateList items={films} renderItem={(film: FilmographyProps) =>
                            <ShortMovieCard film={film}
                                            route={(film)  => navigate('/movies-website/film/' + film.key)}/>
                        }/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PersonPage;