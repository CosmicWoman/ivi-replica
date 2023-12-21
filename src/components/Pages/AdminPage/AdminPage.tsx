import React, {useEffect, useState} from 'react';
import FilmBlock from "./FilmBlock/FilmBlock";
import GenresBlock from "./GenresBlock/GenresBlock";
import './AdminPage.scss'
import {useTranslation} from "react-i18next";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";

const AdminPage = () => {
    const [activeBlock, setActiveBlock] = useState('')
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const admin = useTypedSelector(state => state.auth.isAdmin);

    useEffect(() => {
        if(!admin){
            navigate('/movies-website/auth/')
        }
    }, [])

    return (
        <div className="AdminPage" data-testid='adminPage'>
            <div className="AdminPage__container container">
                <div className="AdminPage__content">

                        <div className="AdminPage__btn">
                            <div
                                className={activeBlock === "films" ? "AdminPage__block-film_active" : "AdminPage__block-film"}
                                key='films'
                                onClick={() => setActiveBlock('films')}
                            >
                                {t('moviesPage.title')}
                            </div>
                            <div
                                className={activeBlock === "genres" ? "AdminPage__block-genre_active" : "AdminPage__block-genre"}
                                key='genres'
                                onClick={() => setActiveBlock('genres')}
                            >
                                {t('moviesPage.genre')}
                            </div>
                        </div>

                    {activeBlock === 'films' && <FilmBlock/>}
                    {activeBlock === 'genres' && <GenresBlock/>}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;