import React, { useEffect } from "react";
import './NotFoundPage.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    useEffect( () => {
        setTimeout(() => {
            navigate (`/movies-website/`);
        },3000)
    },[]);

    return (
        <div className="notFoundPage" data-testid='notFoundPage'>
            <h3 className="notFoundPage__heading">{t('notFoundPage.error')}</h3>
            <div className="notFoundPage__text">{t('notFoundPage.text')}</div>
        </div>
    );
};

export default NotFoundPage;
