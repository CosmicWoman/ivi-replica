import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './CreatorsBlock.scss';
import { CreatorsBlockProps } from "../../../../../types/filmPageTypes";

import Card from "../../../../UI/Buttons/Card/Card";
import LanguageHook from "../../../../../hooks/LanguageHook";
import { useDispatch } from "react-redux";
import { internalPageTrue } from "../../../../../store/reducers/internalPageReducer";
import { allCreatorsBlockTrue } from "../../../../../store/reducers/allCreatorsBlockReducer";

const CreatorsBlock:FC<CreatorsBlockProps> = ({persons}) => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [actors, setActors] = useState(persons.slice(0,10));

    useEffect( () => {
        let filtredList = persons.filter(actor => actor.professions[0].name === 'актеры');
        if (filtredList.slice(0,10).length < 10) {
            setActors(persons.slice(0,10));
        } else {
            setActors(filtredList.slice(0,10));    
        }
    },[persons]);

    useEffect( () => {
        setActors(persons.slice(0,0));  

        setTimeout( () => {
            let filtredList = persons.filter(actor => actor.professions[0].name === 'актеры');
            if (filtredList.slice(0,10).length < 10) {
                setActors(persons.slice(0,10));
            } else {
                setActors(filtredList.slice(0,10));    
            } 
            }, 100) 
    },[i18n.language]);

    function onIncrement() {
        dispatch(internalPageTrue())
        dispatch(allCreatorsBlockTrue())
    };

    return (
        <div className="creatorsBlock">
            <h3 className="creatorsBlock__heading" onClick={onIncrement}>{t('filmPage.creatorsBlock.header')}</h3>
            <div className="creatorsBlock__body">

                    {actors.map( actor => 
                        <div 
                            className="creatorsBlock__card" 
                            key={actor?.id}
                            onClick={() => navigate (`/movies-website/person/${actor.id}`)}
                        >
                            <Card 
                                title={LanguageHook (actor.nameRu, actor.nameEn, i18n.language)}
                                type="big"
                                role="актёр"
                                photoUrl={actor?.photoUrl}
                            />
                        </div>
                    )}

                    <div className="creatorsBlock__round" onClick={onIncrement}>
                        <p className="creatorsBlock__roundText">{t('filmPage.creatorsBlock.more')}</p>    
                    </div> 
                     
            </div>
        </div>
    );
};

export default CreatorsBlock;