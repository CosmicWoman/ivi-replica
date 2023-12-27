import React, {useEffect, useState} from 'react';
import Filters from "../../Filters/Filters";
import './MoviesPage.scss'
import Sorting from "../../Sorting/Sorting";
import CreateList from "../../CreateList/CreateList";
import FilmCard from "../../FilmCard/FilmCard";
import {useTranslation} from "react-i18next";
import {
    activeFilters,
    activeFiltersProps,
    arrAllFilters,
    FilmProps,
    startFiltersProps
} from "../../../types/filtersTypes";
import _ from "lodash";
import axios, {AxiosError} from "axios";
import Button from "../../UI/Buttons/Button/Button";
import {useNavigate, useParams} from "react-router-dom";
import Icons from "../../Icons/Icons";
import ButtonReset from "../../Filters/ButtonReset/ButtonReset";
import {firstCharUp, languageFilters} from "./utils";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import GradeBlock from '../../GradeBlock/GradeBlock';
import AxiosErrorCheck from "../../../hooks/AxiosErrorCheck";
import {FilmPageProps} from "../../../types/filmPageTypes";
import {Film} from "../FilmPage/FilmPage";
import api from '../../../api'

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
        const [errorAxios, setErrorAxios] = useState(true)
        const [movie, setMovie] = useState<FilmPageProps>(Film)
        const [emptyFilters, setEmptyFilters] = useState(true)

        let sortOptions = ['popularity', 'rating', 'novelty', 'alphabet']

        useEffect(() => {
            fetchMovies()
            clearPage()
        }, [sortValue])

        useEffect(() => {
            singleFilters()
            clearPage()
            fetchMovies()
            checkedFilters()
        }, [selectedFilters])

        useEffect(() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
            window.onscroll = () => {
                window.scroll();
            }
            fetchFilters()
            axiosCheck()
        }, [])

        useEffect(() => {
            addFilter(allFilters)
        }, [params])

        useEffect(() => {
            singleFilters()
            breadFilter()
        }, [i18n.language])

        function singleFilters() {
            let filters: any[] = []
            if (selectedFilters.genres.length > 1 || selectedFilters.countries.length > 1) {
                setOneFilters(filters)
                return
            }
            if (selectedFilters.genres.length === 1) {
                let lang = allFilters.genres.find(genre => genre.nameRu === selectedFilters.genres[0])
                if (lang) {
                    if (i18n.language === 'en') {
                        filters = filters.concat(firstCharUp(lang.nameEn))
                    } else {
                        filters = filters.concat(firstCharUp(lang.nameRu))
                    }
                }
            }

            if (selectedFilters.years)
                filters.push(selectedFilters.years)

            if (selectedFilters.countries.length === 1) {
                let lang = allFilters.countries.find(country => country.nameRu === selectedFilters.countries[0])
                if (lang) {
                    if (i18n.language === 'en') {
                        filters = filters.concat(lang.nameEn)
                    } else {
                        filters = filters.concat(lang.nameRu)
                    }
                }
            }

            setOneFilters(filters)
        }

        function clearPage() {
            setPage(1)
        }

        function uploadFilms() {
            setPage(page + 1)
            fetchMovies()
        }

        async function fetchMovies() {
            let movies_
            let allFilms
            let persons_ = []
            if (selectedFilters.producer) {
                persons_.push(selectedFilters.producer)
            }
            if (selectedFilters.actor) {
                persons_.push(selectedFilters.actor)
            }
            // axios.get('http://localhost:5000/films')
            const response = await api.get.data()
            //@ts-ignore
            movies_ = response.films.map(item => {
                return {
                    key: item.id,
                    nameRu: item.filmNameRu,
                    nameEn: item.filmNameEn,
                    year: item.year,
                    poster: item.smallPictureUrl,
                    rating: item.ratingKp,
                    votes: item.votesKp,
                    filmLength: item.movieLength,
                    countryRu: item.countries.nameRu,
                    countryEn: item.countries.nameEn,
                    genreRu: item.genres.nameRu,
                    genreEn: item.genres.nameEn,
                }
            })
            // Если развернут сервер backend в Docker, то использовать данный формат.
            // const response = await axios.get('http://localhost:5000/films/', {
            //     params: {
            //         perPage: limit,
            //         page,
            //         genres: selectedFilters.genres,
            //         countries: selectedFilters.countries,
            //         year: selectedFilters.years,
            //         persons: persons_,
            //         minRatingKp: selectedFilters.rating,
            //         minVotesKp: selectedFilters.grade,
            //         sortBy: sortValue,
            //     }
            // })

            //@ts-ignore
            let films_ = movies_.filter((item) => ((selectedFilters.genres.includes(item.genreRu) || selectedFilters.genres.length == 0) &&
                (selectedFilters.countries.includes(item.countryRu) || selectedFilters.countries.length == 0) &&
                (selectedFilters.years == item.year || (selectedFilters.years == '')) &&
                (selectedFilters.rating <= item.rating) &&
                (selectedFilters.grade <= item.votes)))

            if (sortValue == 'rating') {
                allFilms = films_.sort((a:any,b:any) => b.rating - a.rating)
            } else if (sortValue == 'novelty') {
                allFilms = films_.sort((a: any, b: any) => b.year - a.year)
            } else if (sortValue == 'alphabet') {
                allFilms = films_.sort((a: any, b: any) => (i18n.language === 'ru') ? ((a.nameRu > b.nameRu) ? 1 : -1) : ((a.nameEn > b.nameEn) ? 1 : -1) )
            } else {
                allFilms = films_
            }

            console.log(allFilms)

            if (page === 1) {
                setMovies(allFilms)
            } else {
                setMovies([...movies, ...allFilms])
            }
        }

        async function fetchFilters() {
            let filters
            // const response = await axios.get('http://localhost:5000/filters')

            const fetchData = await api.get.data()
            const response = fetchData.filters
            console.log(response)
            filters = {
                ...allFilters,
                genres: response.genres,
                // @ts-ignore
                countries: response.countries.map((item) => {
                    return {nameRu: item.countryName, nameEn: item.countryNameEn}
                }),
                years: response.years.reverse()
            }

            setAllFilters(filters)

            addFilter(filters)
        }

        function addFilter(filters: startFiltersProps) {
            let emptyFilters = _.cloneDeep(activeFilters)

            if (params.genre) {
                let genreId = filters.genres.find(genre => genre.nameRu === params.genre)
                if (genreId) {
                    return setSelectedFilters({...emptyFilters, genres: [genreId.nameRu]})
                }
            } else if (params.country) {
                let countryId = filters.countries.find(country => country.nameRu === params.country)
                if (countryId) {
                    return setSelectedFilters({...emptyFilters, countries: [countryId.nameRu]})
                }
            } else if (params.year) {
                return setSelectedFilters({...emptyFilters, years: Number(params.year)})
            } else {
                return setSelectedFilters(emptyFilters)
            }

        }

        function breadFilter() {
            if (selectedFilters.genres.length === 1) {
                let lang = allFilters.genres.find(genre => genre.nameRu === selectedFilters.genres[0])
                if (lang) {
                    if (i18n.language === 'en') {
                        return firstCharUp(lang.nameEn)
                    } else {
                        return firstCharUp(lang.nameRu)
                    }

                }
            } else if (selectedFilters.countries.length === 1) {
                let lang = allFilters.countries.find(country => country.nameRu === selectedFilters.countries[0])
                if (lang) {
                    if (i18n.language === 'en') {
                        return firstCharUp(lang.nameEn)
                    } else {
                        return firstCharUp(lang.nameRu)
                    }
                }
            } else {
                return ''
            }
        }

        function navigateBread() {
            navigate('/movies-website/films/')
            setSelectedFilters(_.cloneDeep(activeFilters))
        }

        function axiosCheck() {
            if (errorAxios !== AxiosErrorCheck('films/')) {
                setErrorAxios(AxiosErrorCheck('films/'))
            }
        }

        function checkedFilters() {
            let checkedFilters = JSON.stringify(selectedFilters) === JSON.stringify(activeFilters)
            setEmptyFilters(checkedFilters)
        }

        return (
            <div className='MoviesPage' data-testid='moviesPage'>
                <div className="MoviesPage__container container">
                    <div className="MoviesPage__content">

                        <div className="MoviesPage__header">
                            <div className="MoviesPage__path">
                                <Breadcrumbs filters={breadFilter()} onClick={() => navigateBread()}/>
                            </div>
                            <div className="MoviesPage__title">
                                {t('moviesPage.title')}
                                {oneFilters.length > 0 ? (': ' + oneFilters.join(', ')) : ''}

                            </div>
                            <div className="MoviesPage__subtitle">
                                {!selectedFilters.genres.length ? (t('moviesPage.filters-genre') + ', ') : (languageFilters(selectedFilters.genres, allFilters.genres, i18n.language).join(', ') + ', ')}
                                {!selectedFilters.countries.length ? (t('moviesPage.filters-countries') + ', ') : (languageFilters(selectedFilters.countries, allFilters.countries, i18n.language).join(', ') + ', ')}
                                {!selectedFilters.years ? t('moviesPage.filters-year') : selectedFilters.years}
                            </div>
                        </div>

                        <div className="MoviesPage__sorting">
                            <Sorting options={sortOptions} sortValue={sortValue} setSortValue={setSortValue}/>
                        </div>
                        <div className="MoviesPage__filters">
                            <Filters activeFilters={activeFilters}
                                     allFilters={allFilters}
                                     selectedFilters={selectedFilters}
                                     setSelectedFilters={setSelectedFilters}/>
                        </div>
                        <div className="MoviesPage__listMovies listMovies">
                            <CreateList items={movies} renderItem={(movie: FilmProps) =>
                                <div className="listMovies__film-card"
                                     key={movie.key}>
                                    <FilmCard icons={true}
                                              film={movie}
                                              onClick={(movie) => navigate('/movies-website/film/' + movie.key)}
                                    />
                                </div>
                            }/>

                        </div>

                        <div className="MoviesPage__btn">
                            <Button type={'ultraWide'} color={'transparent'}
                                    title={[t('moviesPage.btn')]}
                                    onClick={() => uploadFilms()}/>
                        </div>

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
                                    <Filters activeFilters={activeFilters} allFilters={allFilters}
                                             selectedFilters={selectedFilters}
                                             setSelectedFilters={setSelectedFilters}/>
                                </div>
                                <div className="MoviesPage__filters_btn">
                                    <div className="MoviesPage__btn-show">
                                        <Button type='ultraWide' color='red' title={[t('moviesPage.show')]}
                                                onClick={() => setVisible(!visible)}/>
                                    </div>
                                    <div className="MoviesPage__btn-reset">
                                        <ButtonReset selectedFilters={selectedFilters} activeFilters={activeFilters}
                                                     setSelectedFilters={setSelectedFilters}/>

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
                                            icons={true}
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

                <GradeBlock/>
            </div>
        );
    }
;

export default MoviesPage;