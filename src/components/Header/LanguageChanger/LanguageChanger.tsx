import { useEffect, useState } from 'react';
import './LanguageChanger.scss'
import { useTranslation } from 'react-i18next';

const  LanguageChanger = () => {

    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  
    const changeLanguage = (language:string) => {
        document.querySelector(`#${currentLanguage}`)?.classList.remove('languageChanger__btn_active');
        i18n.changeLanguage(language);
        setCurrentLanguage(i18n.language);
    }

    useEffect( () => {
       document.querySelector(`#${currentLanguage}`)?.classList.add('languageChanger__btn_active');
    }, [currentLanguage])
  
    return (
        <div className='container languageChanger'>
            <div className='languageChanger__block'>
                <button 
                    className='languageChanger__btn' 
                    id='en'
                    onClick={() => changeLanguage('en')}
                >EN</button>
                <p className='languageChanger__text'>/</p>
                <button 
                    className='languageChanger__btn languageChanger__btnActive'
                    id='ru' 
                    onClick={() => changeLanguage('ru')}
                >RU</button>    
            </div>
        </div>
    )
}

export default LanguageChanger;