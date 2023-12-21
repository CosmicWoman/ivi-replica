import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShortMovieCard from "./ShortMovieCard/ShortMovieCard";
import {PersonPageProps, FilmographyProps} from "../../../types/filtersTypes";
import PersonHeader from "./PersonHeader/PersonHeader";
import Filmography from "./FilmographyFiltrs/Filmography";
import './PersonPage.scss'
import Icons from "../../Icons/Icons";
import axios from "axios";
import {useTranslation} from "react-i18next";
import CreateList from "../../CreateList/CreateList";
import Loader from '../../UI/Loader/Loader';

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
    const [person, setPerson] = useState<PersonPageProps>(Person)
    const [films, setFilms] = useState<FilmographyProps[]>([])
    const [subtitle, setSubtitle] = useState('')
    const [isPageLoading, setIsPageLoading] = useState(false)

    useEffect(() => {
        fetchPerson();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [])

    useEffect(() => {
        createSubtitle()
    }, [i18n.language])

    async function fetchPerson() {
        setIsPageLoading(true)


        const response = await axios.get('http://localhost:5000/actorPage')

        // Если развернут сервер backend в Docker, то использовать данный формат.
        // const response = await axios.get(`http://localhost:5000/person/${params.id}`)

        const person_ = {
            id: response.data.id,
            nameRu: response.data.nameRu,
            nameEn: response.data.nameEn,
            photo: response.data.photoUrl,
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
        setIsPageLoading(false);
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
        <div className="actorPage" data-testid='personPage'>
            {isPageLoading
                ? <Loader/>
                :
                <div className="actorPage__container container">
                    <div className="actorPage__content">

                        <div className="actorPage__btn-back btn-back"
                             onClick={() => navigate(-1)}
                        >
                            <Icons className='actorPage__arrow_small' name='back' size='40'/>
                            <Icons className='actorPage__arrow_big' name='back' size='50'/>
                            {t('personPage.btn-back')}
                        </div>

                        <div className="actorPage__info">
                            <PersonHeader person={person}/>

                            <div className="actorPage__filmography">
                                <Filmography movies={films.length}/>
                                <CreateList items={films} renderItem={(film: FilmographyProps) =>
                                    <ShortMovieCard key={film.key}
                                                    film={film}
                                                    route={(film) => navigate('/movies-website/film/' + film.key)}/>
                                }/>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default PersonPage;