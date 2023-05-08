import React, {useEffect, useState} from 'react';
import Filters from "../../Filters/Filters";
import './MoviesPage.scss'
import Sorting from "../../Sorting/Sorting";
import CreateList from "../../CreateList/CreateList";
import FilmCard from "../../FilmCard/FilmCard";
import {useTranslation} from "react-i18next";
import {activeFiltersProps, FilmProps, startFiltersProps} from "../../../types/testCase";
import _ from "lodash";
import axios from "axios";
import Button from "../../UI/Buttons/Button/Button";
import {useNavigate, useParams} from "react-router-dom";
import Icons from "../../Icons/Icons";
import ButtonReset from "../../Filters/ButtonReset/ButtonReset";

const activeFilters = {
    'popularGenres': [],
    'genres': [],
    'popularCountries': [],
    'countries': [],
    'years': 0,
    'rating': 0,
    'grade': 0,
    'producer': '',
    'actor': ''
}

const arrAllFilters = {
    'popularGenres': [
        {
            'nameRu': 'драма',
            'nameEn': 'drama'
        },
        {
            'nameRu': 'боевик',
            'nameEn': 'action'
        },
        {
            'nameRu': 'триллер',
            'nameEn': 'thriller'
        },
        {
            'nameRu': 'криминал',
            'nameEn': 'crime'
        },
        {
            'nameRu': 'комедия',
            'nameEn': 'comedy'
        },
        {
            'nameRu': 'фантастика',
            'nameEn': 'fantastic'
        },
        {
            'nameRu': 'приключения',
            'nameEn': 'adventures'
        },
        {
            'nameRu': 'семейный',
            'nameEn': 'family'
        },
        {
            'nameRu': 'аниме',
            'nameEn': 'anime'
        },
        {
            'nameRu': 'фэнтези',
            'nameEn': 'fantasy'
        }
    ],
    'genres': [
        {
            'nameRu': '',
            'nameEn': ''
        }
    ],
    'popularCountries': [
        {
            'nameRu': 'Россия',
            'nameEn': ''
        },
        {
            'nameRu': 'США',
            'nameEn': ''
        },
        {
            'nameRu': 'Германия',
            'nameEn': ''
        },
        {
            'nameRu': 'Великобритания',
            'nameEn': ''
        },
        {
            'nameRu': 'Япония',
            'nameEn': ''
        },
        {
            'nameRu': 'Китай',
            'nameEn': ''
        },
        {
            'nameRu': 'Корея Южная',
            'nameEn': ''
        },
        {
            'nameRu': 'Индия',
            'nameEn': ''
        },
        {
            'nameRu': 'СССР',
            'nameEn': ''
        },
        {
            'nameRu': 'Франция',
            'nameEn': ''
        }
    ],
    'countries': [
        {
            'nameRu': '',
            'nameEn': ''
        }
    ],
    'years': [],
    'rating': 0,
    'grade': 0,
    'producer': '',
    'actor': ''
}

const MoviesPage = () => {
    const {t, i18n} = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<FilmProps[]>([]);
    const [sortValue, setSortValue] = useState('popularity');
    const [allFilters, setAllFilters] = useState<startFiltersProps>(arrAllFilters);
    const [selectedFilters, setSelectedFilters] = useState<activeFiltersProps>(_.cloneDeep(activeFilters));
    const [oneFilters, setOneFilters] = useState<string[]>([]);
    const [limit, setLimit] = useState(35);
    const [page, setPage] = useState(1);
    const [persons, setPersons] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);

    const emptyFilters = JSON.stringify(selectedFilters) === JSON.stringify(activeFilters)


    let sortOptions = ['popularity', 'rating', 'novelty']

    useEffect(() => {
        fetchMovies()
    }, [page])

    useEffect(() => {
        fetchMovies()
        clearPage()
    }, [sortValue])

    useEffect(() => {
        singleFilters()
        clearPage()
        fetchMovies()
        Persons()
    }, [selectedFilters])

    useEffect(() => {
        fetchFilters()
        addFilter()
    }, [])

    function singleFilters() {
        let filters: any[] = []
        if (selectedFilters.genres.length > 1 || selectedFilters.countries.length > 1) {
            setOneFilters(filters)
            return
        }
        if (selectedFilters.genres.length === 1)
            filters = filters.concat(selectedFilters.genres)
        if (selectedFilters.years)
            filters.push(selectedFilters.years)
        if (selectedFilters.countries.length === 1)
            filters = filters.concat(selectedFilters.countries)

        setOneFilters(filters)
    }

    function clearPage() {
        setPage(1)
    }

    function uploadFilms() {
        setPage(page + 1)
    }

    function Persons() {
        let persons_ = []
        persons_.push(selectedFilters.producer)
        persons_.push(selectedFilters.actor)
        setPersons(persons_)
    }

    async function fetchMovies() {

        const response = await axios.get('http://localhost:5000/films/', {
            params: {
                perPage: limit,
                page,
                genres: selectedFilters.genres,
                countries: selectedFilters.countries,
                persons: persons,
                minRatingKp: selectedFilters.rating,
                minVotesKp: selectedFilters.grade,
                sortBy: sortValue,
            }
        })

        // @ts-ignore
        const movies_ = response.data.map(item => {
            return {
                key: item.id,
                nameRu: item.filmNameRu,
                nameEn: item.filmNameEn,
                year: item.year,
                poster: item.smallPictureUrl,
                rating: item.ratingKp,
                filmLength: item.movieLength,
                countryRu: '',
                countryEn: '',
                genreRu: '',
                genreEn: '',
            }

        })

        if (page === 1) {
            setMovies(movies_)
        } else {
            setMovies([...movies, ...movies_])
        }
    }

    async function fetchFilters() {
        const response = await axios.get('http://localhost:5000/filters')

        setAllFilters({
            ...allFilters,
            genres: response.data.genres,
            // @ts-ignore
            countries: response.data.countries.map((item) => {return{nameRu: item.countryName, nameEn: item.countryName}}),
            years: response.data.years
        })
    }

    function addFilter() {
        if (params.genres){
            selectedFilters.genres.push(params.genres)
        }
        if (params.country){
            selectedFilters.genres.push(params.country)
        }
        if (params.year){
            selectedFilters.genres.push(params.year)
        }
    }

    return (
        <div className='MoviesPage'>
            <div className="MoviesPage__container">
                <div className="MoviesPage__content">

                    <div className="MoviesPage__header">
                        <div className="MoviesPage__path">
                            {/*    хлебные крошки(только жанры)*/}
                        </div>
                        <div className="MoviesPage__title">
                            {t('moviesPage.title')}
                            {oneFilters.length > 0 ? (': ' + oneFilters.join(', ')) : ''}

                        </div>
                        <div className="MoviesPage__subtitle">
                            {!selectedFilters.genres.length ? (t('moviesPage.filters-genre') + ', ') : (selectedFilters.genres.join(', ') + ', ')}
                            {!selectedFilters.countries.length ? (t('moviesPage.filters-countries') + ', ') : (selectedFilters.countries.join(', ') + ', ')}
                            {!selectedFilters.years ? t('moviesPage.filters-year') : selectedFilters.years}
                        </div>
                    </div>

                    <div className="MoviesPage__sorting">
                        <Sorting options={sortOptions} sortValue={sortValue} setSortValue={setSortValue}/>
                    </div>
                    <div className="MoviesPage__filters">
                        <Filters activeFilters={activeFilters} allFilters={allFilters} selectedFilters={selectedFilters}
                                 setSelectedFilters={setSelectedFilters}/>
                    </div>
                    <div className="MoviesPage__listMovies listMovies">
                        <CreateList items={movies} renderItem={(movie: FilmProps) =>
                            <div className="listMovies__film-card"
                                 key={movie.key}>
                                <FilmCard
                                          film={movie}
                                          onClick={(movie) => navigate('/movies-website/film/' + movie.key)}
                                />
                            </div>
                        }/>

                    </div>

                    <Button type={'ultraWide'} color={'transparent'}
                            title={[t('moviesPage.btn')]}
                            onClick={() => uploadFilms()}/>

                </div>
            </div>


            <div className="MoviesPage__mobile">
                <div className="MoviesPage__header">
                    <div className="MoviesPage__title">
                        {t('moviesPage.title')}
                        {oneFilters.length > 0 ? (': ' + oneFilters.join(', ')) : ''}
                    </div>
                    <div className="MoviesPage__subtitle">
                        {!selectedFilters.genres.length ? (t('moviesPage.filters-genre') + ', ') : (selectedFilters.genres.join(', ') + ', ')}
                        {!selectedFilters.countries.length ? (t('moviesPage.filters-countries') + ', ') : (selectedFilters.countries.join(', ') + ', ')}
                        {!selectedFilters.years ? t('moviesPage.filters-year') : selectedFilters.years}
                    </div>
                    <div className="MoviesPage__btn-filters">
                        <Button type='rounded' color='default'
                                svg={<Icons name='slider' size='24'/>}
                                title={[t('moviesPage.filters')]}
                                onClick={() => setVisible(!visible)}/>
                        {!emptyFilters && <div className="MoviesPage__btn-circle"></div>}
                    </div>
                    {visible &&
                        <div className="MoviesPage__filters">
                            <div className="MoviesPage__filters_content">
                                <div className="MoviesPage__cross"
                                     onClick={() => setVisible(!visible)}
                                >
                                    <Icons name='cross' size='20'/>
                                </div>
                                <div className="MoviesPage__filters_title">
                                    {t('moviesPage.filters')}
                                </div>
                                <Filters activeFilters={activeFilters} allFilters={allFilters} selectedFilters={selectedFilters}
                                         setSelectedFilters={setSelectedFilters}/>
                            </div>
                            <div className="MoviesPage__filters_btn">
                                <div className="MoviesPage__btn-show">
                                    <Button type='ultraWide' color='red' title={[t('moviesPage.show')]} onClick={() => setVisible(!visible)}/>
                                </div>
                                <div className="MoviesPage__btn-reset">
                                    <ButtonReset selectedFilters={selectedFilters} activeFilters={activeFilters} setSelectedFilters={setSelectedFilters}/>

                                </div>

                            </div>
                        </div>
                    }
                </div>

                <div className="MoviesPage__mobile-content">

                    <div className="MoviesPage__sorting">
                        <Sorting options={sortOptions} sortValue={sortValue} setSortValue={setSortValue}/>
                    </div>

                    <div className="MoviesPage__listMovies listMovies">
                        {!visible &&
                            <CreateList items={movies} renderItem={(movie: FilmProps) =>
                                <div className="listMovies__film-card"
                                     key={movie.key}>
                                    <FilmCard
                                        film={movie}
                                        onClick={(movie) => navigate('/movies-website/film/' + movie.key)}
                                    />
                                </div>
                            }/>
                        }


                    </div>

                    <Button type={'ultraWide'} color={'transparent'}
                            title={[t('moviesPage.btn')]}
                            onClick={() => uploadFilms()}/>

                </div>

            </div>
        </div>
    );
};

export default MoviesPage;