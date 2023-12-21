import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

interface CreateEndProps {
    number: number,
    wordOne: string,
    wordTwo: string,
    wordThree: string,
    wordEn: string
}

const CreateEnd: FC<PropsWithChildren<CreateEndProps>> = (
    {
        number,
        wordOne,
        wordTwo,
        wordThree,
        wordEn
    }) => {

    const {t, i18n} = useTranslation();
    const [word, setWord] = useState('')

    useEffect(() => {
        createEnd()
    }, [number])

    function createEnd() {
        let num = Math.abs(number)

        num %= 100
        if (num >= 5 && num <= 20) {
            return setWord(wordTwo)
        }

        num %= 10
        if (num === 1) {
            return setWord(wordOne)
        }

        if (num >= 2 && num <= 4) {
            return setWord(wordThree)
        }
        return setWord(wordTwo)
    }

    function createWord() {
        if(i18n.language === 'en'){
            return wordEn
        } else {
            return word
        }
    }

    return (
        <div data-testid='filmography-word'
             className='word'>
            {number + ' ' + createWord()}
        </div>
    );
};

export default CreateEnd;