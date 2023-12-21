import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import './TypeSearch.scss'
import MyInput from "../../../UI/Inputs/MyInput/MyInput";
import RowSearchResult from "../../../Search/RowSearchResult/RowSearchResult";
import {useTranslation} from "react-i18next";
import axios from "axios";

interface TypeSearchProps {
    handleChangeFilter: (item:string) => void,
    professionId: number,
    setActiveBlock: ([]) => void
}

interface Result {
    nameEn: string,
    nameRu: string,
    key: number,
}

const TypeSearch: FC<PropsWithChildren<TypeSearchProps>> = ({handleChangeFilter, professionId, setActiveBlock}) => {
    const { t, i18n } = useTranslation();

    const [searchResults, setSearchResult] = useState<Result[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if(searchQuery){
            fetchFilm()
        } else {
            setSearchResult([])
        }
    }, [searchQuery])

    function select(value: string) {
        handleChangeFilter(value)
        setSearchResult([])
        setActiveBlock([])
    }

    function renderResult(value: Result){
        return (<RowSearchResult title={(i18n.language === 'en' && value.nameEn) ? value.nameEn : value.nameRu}
                                 key={value.key}
                                 onClick={() => select(value.nameRu)}/>
        )
    }
    async function fetchFilm() {
        const response = await axios.get('http://localhost:5000/findPersonsByNameAndProfession', {
            params: {
                id: professionId,
                name: searchQuery
            }
        })

        let result = response.data
        // @ts-ignore
        let searchResults = result.map(item => {
            return {
                key: item.id,
                nameRu: item.nameRu,
                nameEn: item.nameEn,
            }
        })

        setSearchResult(searchResults)
    }

    return (
        <>
            <div className='TypeSearch'>
                <div className="TypeSearch__content">
                    <MyInput result={searchResults}
                             renderResult={renderResult}
                             placeholder={t('filters.search.placeholder-small')}
                             cl={true}
                             handleClear={() => handleChangeFilter('')}
                             searchQuery={searchQuery}
                             setSearchQuery={setSearchQuery}
                             search={true}
                    />
                </div>
            </div>
        </>
    );
};

export default TypeSearch;