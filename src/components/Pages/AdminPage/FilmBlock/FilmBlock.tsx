import React, {useEffect, useState} from 'react';
import MyInput from "../../../UI/Inputs/MyInput/MyInput";
import {Item, MovieProps, MovieSearchProps} from "../../../../types/filtersTypes";
import Button from "../../../UI/Buttons/Button/Button";
import axios from "axios";
import RowSearchResult from "../../../Search/RowSearchResult/RowSearchResult";
import './filmBlock.scss'
import {useTranslation} from "react-i18next";
import Icons from "../../../Icons/Icons";

const Name = {
    nameRu: '',
    nameEn: '',
    key: ''
}

const FilmBlock = () => {
    const [film, setFilm] = useState<MovieSearchProps>(Name)
    const [films, setFilms] = useState<MovieProps[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [active, setActive] = useState(false)
    const {t, i18n} = useTranslation();

    useEffect(() => {
        fetchFilm()
    }, [searchQuery])

    useEffect(() => {
        fetchFilm()
    }, [])

    useEffect(() => {
        if (film) {
            inputName(film.nameEn)
            inputName(film.nameRu)
        }
    }, [film])

    async function fetchFilm() {
        const response = await axios.get('http://localhost:5000/search', {
            params: {
                name: searchQuery,
            }
        })

        let films = response.data.films
        // @ts-ignore
        let searchFilms = films.map(item => {
            return {
                key: item.id,
                nameRu: item.nameRu,
                nameEn: item.nameEn,
            }
        })

        setFilms(searchFilms)
    }

    function deleteFilm() {
        if (film !== Name) {
            const response = axios.delete(`http://localhost:5000/film/${film.key}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setFilm(Name)
            setActive(true)
        }
    }

    function editFilm() {
        if (film !== Name) {
            const response = axios.patch(`http://localhost:5000/film/${film.key}`, {
                filmNameRu: film?.nameRu,
                filmNameEn: film?.nameEn
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setFilm(Name)
            setActive(true)
        }
    }

    function titleLang(film: MovieSearchProps) {
        if (i18n.language === 'en' && film.nameEn) {
            return film.nameEn
        } else {
            return film.nameRu
        }
    }

    function actionSearch(value: MovieSearchProps) {
        setFilm(value)
        setSearchQuery('')
    }

    function renderResult(value: MovieProps) {
        if (searchQuery) {
            return (<RowSearchResult title={titleLang(value)} key={value.key} onClick={() => actionSearch(value)}/>
            )
        }
    }

    function inputName(value: string) {
        if (film) {
            return value
        }
    }

    return (
        <div className="FilmBlock">
            <div className="FilmBlock__search">
                <MyInput result={films}
                         renderResult={renderResult}
                         placeholder={t('adminPage.placeholder')} cl={false}
                         searchQuery={searchQuery}
                         setSearchQuery={setSearchQuery}
                         search={true}
                />
            </div>

            <div className="FilmBlock__result">
                <div className="FilmBlock__nameRu">
                    <input className="FilmBlock__nameRu_input"
                           type="text"
                           value={film ? inputName(film.nameRu) : ''}
                           onChange={e => setFilm({...film, nameRu: e.target.value})}
                    />
                </div>
                <div className="FilmBlock__nameEn">
                    <input className="FilmBlock__nameEn_input"
                           type="text"
                           value={film ? inputName(film.nameEn) : ''}
                           onChange={e => setFilm({...film, nameEn: e.target.value})}
                    />
                </div>
            </div>

            <div className="FilmBlock__change">
                <Button type='default'
                        color='default'
                        title={[t('adminPage.saveChange')]}
                        onClick={() => editFilm()}/>
            </div>
            <div className="FilmBlock__delete">
                <Button type='default'
                        color='default'
                        title={[t('adminPage.delete')]}
                        onClick={() => deleteFilm()}/>
            </div>

            {active &&
                <div className="FilmBlock__modal modal">
                    <div className="modal__content">

                        <Icons className='modal__icons' name='complete' size='30'/>

                        <div className="modal__title">
                            {t('adminPage.changes')}
                        </div>

                        <div className="modal__button">
                            <Button type='default'
                                    color='transparent'
                                    title={[t('adminPage.ok')]}
                                    onClick={() => setActive(false)}/>
                        </div>
                    </div>
                </div>}

        </div>
    );
};

export default FilmBlock;