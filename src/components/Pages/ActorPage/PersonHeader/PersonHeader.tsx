import React, {FC, PropsWithChildren} from 'react';
import './PersonHeader.scss'
import {useTranslation} from "react-i18next";
import {PersonPageProps} from "../../../../types/filtersTypes";

interface PersonHeaderProps {
    'person':PersonPageProps
}

const PersonHeader: FC<PropsWithChildren<PersonHeaderProps>> = ({person}) => {
    const {t, i18n} = useTranslation();

    return (
        <div className="actorHeader">
            <div data-testid='personHeader'
                 className="actorHeader__content">

                <div className="actorHeader__foto">
                    <img src={person.photo} alt=""/>
                </div>
                <div className="actorHeader__name name">
                    <div className="name__title">
                        {i18n.language === 'en' && person.nameEn ? person.nameEn : person.nameRu}
                    </div>
                    <div className="name__subtitle">
                        {i18n.language === 'en' && person.nameEn ? person.nameRu : person.nameEn}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PersonHeader;