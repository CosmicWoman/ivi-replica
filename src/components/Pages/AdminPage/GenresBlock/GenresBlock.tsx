import React, {useEffect, useState} from 'react';
import CreateList from "../../../CreateList/CreateList";
import {genreAdmin, Item} from "../../../../types/filtersTypes";
import Button from "../../../UI/Buttons/Button/Button";
import axios from "axios";
import Icons from "../../../Icons/Icons";
import './genresBlock.scss'
import {firstCharUp} from "../../MoviesPage/utils";
import {useTranslation} from "react-i18next";

const Genre = {
    id: 0,
    nameRu: '',
    nameEn: ''
}

const GenresBlock = () => {
    const [genres, setGenres] = useState<genreAdmin[]>([])
    const [genre, setGenre] = useState<genreAdmin>(Genre)
    const {t, i18n} = useTranslation();

    useEffect(() => {
        fetchGenres()
    }, [])

    useEffect(() => {
        fetchGenres()
    }, [genres])

    async function fetchGenres() {
        const response = await axios.get('http://localhost:5000/genres')

        // @ts-ignore
        let filters = response.data.map(item => {
            return {
                id: item.id,
                nameRu: item.nameRu,
                nameEn: item.nameEn
            }
        })

        setGenres(filters)
    }

    function editGenres() {
        const response = axios.patch(`http://localhost:5000/genre/${genre?.id}`, {
                nameRu: genre.nameRu,
                nameEn: genre.nameEn
        },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setGenre(Genre)
    }

    return (
        <div className="GenresBlock">
            <div className="GenresBlock__genres">
                <CreateList items={genres} renderItem={(value: genreAdmin) =>
                    <div className="GenresBlock__genre genre"
                         key={value.id}
                         onClick={() => setGenre(value)}
                    >
                            {i18n.language === 'ru' ? firstCharUp(value.nameRu) : firstCharUp(value.nameEn)}
                        <div className="genre__editing">
                            <Icons name='edit' size='24'/>
                        </div>
                    </div>
                }/>
            </div>
            {genre !== Genre &&
                <div className="GenresBlock__block"
                     onClick={() => setGenre(Genre)}
                >
                    <div className="GenresBlock__edit-block"
                         onClick={(event) => event.stopPropagation() }
                    >
                        <div className="GenresBlock__edit-name">
                            <div className="GenresBlock__edit-name_ru">
                                {t('adminPage.ru')}
                                <input className='GenresBlock__edit-name_input'
                                       type="text"
                                       value={genre.nameRu}
                                       onChange={e => setGenre( {...genre, nameRu: e.target.value})}
                                />
                            </div>

                            <div className="GenresBlock__edit-name_en">
                                {t('adminPage.en')}
                                <input className='GenresBlock__edit-name_input'
                                       type="text"
                                       value={genre.nameEn}
                                       onChange={e => setGenre( {...genre, nameEn: e.target.value})}
                                />
                            </div>

                        </div>
                        <Button type='default'
                                color='default'
                                title={[t('adminPage.change')]}
                                onClick={() => editGenres()}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default GenresBlock;