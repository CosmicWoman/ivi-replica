import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './AllCreatorsBlock.scss';
import { AllCreatorsBlockProps } from "../../../../../../../types/filmPageTypes";
import { IPerson } from "../../../../../../../types/filmPageTypes";

import Card from "../../../../../../UI/Buttons/Card/Card";
import Button from "../../../../../../UI/Buttons/Button/Button";

import LanguageHook from "../../../../../../../hooks/LanguageHook";
import { useTypedSelector } from "../../../../../../../hooks/useTypedSelector";

const person = {
    id: 0,
    photoUrl: '',
    nameRu: '',
    nameEn: '',
    professions: [
        {
            id: 0,
            name: '',
        }
    ]
}

const AllCreatorsBlock:FC<AllCreatorsBlockProps> = ({persons}) => {

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const {internalPageBlockStatus} = useTypedSelector( state => state.internalPage);

    const [professions, setProfessions] = useState<any []>(['']);

    useEffect ( () => {
        if (!internalPageBlockStatus) {
            setProfessions([''])
        } else {
            let profs = new Set();
            persons.map(person => profs.add(person.professions[0].name) );
            setProfessions(Array.from(profs))
        }
    }, [internalPageBlockStatus])

    useEffect( () => {
        
        let profs = new Set();
        persons.map(person => profs.add(person.professions[0].name) );
        setProfessions(Array.from(profs));

    }, [persons])

    function showMore(e: React.MouseEvent<HTMLDivElement>) {
        e.currentTarget.parentElement?.children[1].classList.remove('allCreatorsBlock__cards_short');
        e.currentTarget.remove();
    }

    return (
        <div className="allCreatorsBlock" >

            {professions.map( (prof:string) =>

            <div key={prof}>

                <p className="allCreatorsBlock__profession">{prof}</p>

                <div className="allCreatorsBlock__cards allCreatorsBlock__cards_short" >

                    {( persons.filter( (person:IPerson) => 
                            person.professions[0].name === prof)
                            .map( (person:IPerson) => 

                            <div 
                                className="allCreatorsBlock__card" 
                                key={person?.id}
                                onClick={() => navigate (`/movies-website/person/${person.id}`)}
                            >
                                <Card 
                                    title={LanguageHook (person.nameRu, person.nameEn, i18n.language)}
                                    type="big"
                                    role={
                                        (Math.round(Math.random()*10) + 
                                        Math.round(Math.random()*10)) + 
                                        t('internalPage.allCreatorsBlock.movies')
                                    }
                                    photoUrl={person?.photoUrl}
                                />
                            </div>
                            
                        )
                            
                    )}

                </div>

                {( persons.filter( (person:IPerson) => 
                    person.professions[0].name === prof).length > 16
                    ?
                    <Button 
                            type="ultraWide"
                            title={['internalPage.allCreatorsBlock.show']} 
                            color="transparent"
                            onClick={showMore}
                    />
                    : 
                    <div/>
                )}

            </div>
                    
            )}

        </div>
    );
};

export default AllCreatorsBlock;