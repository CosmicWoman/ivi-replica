import React, { FC, useEffect, useState } from "react";
import classes from './HeaderActiveList.module.scss'
import { HeaderActiveListProps } from "../../../types/headerTypes";
import { useTranslation } from 'react-i18next';

const HeaderActiveList:FC<HeaderActiveListProps> = ( { dataArray, prefixForId, onHoverChange } ) => {
    const { t, i18n } = useTranslation();

    const [activePoint, setActivePoint] = useState(`${prefixForId}-0`);
    const [headerAdvertiseProp, setHeaderAdvertiseProp] = useState('ivi');

    useEffect( () => {

        document.querySelector(`#${activePoint}`)
            ?.classList.add(classes.activeList__item_active);

        onHoverChange?.(headerAdvertiseProp);

    }, [activePoint]);

    function hoverActivator (e: React.DragEvent<HTMLDivElement>) {

        if (activePoint !== e.currentTarget.id) {

            document.querySelector(`#${activePoint}`)
                ?.classList.remove(classes.activeList__item_active);

            setActivePoint(e.currentTarget.id);
        };
        
        if (e.currentTarget.innerText.includes("Amediateka") ) {
            setHeaderAdvertiseProp('amediateka')
        } else if (e.currentTarget.innerText.includes("Матч") ) {
            setHeaderAdvertiseProp('match')
        } else if (e.currentTarget.innerText.includes("Match") ) {
            setHeaderAdvertiseProp('match')
        }else {
            setHeaderAdvertiseProp('ivi')
        };
    };
    
    return (
        <div className={classes.activeList}>

            <ul className={classes.activeList__list}>
                {dataArray.map ( 
                    (item: any) => 
                        <a key={`${prefixForId}-${item[0]}`} 
                            href={item[2]} 
                            className={classes.activeList__link}
                        >
                            {item[0] == 0
                            ?
                                <p id={`${prefixForId}-${item[0]}`}
                                    className={`${classes.activeList__item} ${classes.activeList__item_active}`}
                                    onMouseOver={hoverActivator}
                                >
                                    {t(item[1])}
                                </p>
                            :
                                <p id={`${prefixForId}-${item[0]}`}
                                    className={classes.activeList__item}
                                    onMouseOver={hoverActivator}
                                >
                                    {t(item[1])}
                                </p>
                            }
                        </a>
                    )
                };     
            </ul>
            
        </div>    
    );
};

export default HeaderActiveList;