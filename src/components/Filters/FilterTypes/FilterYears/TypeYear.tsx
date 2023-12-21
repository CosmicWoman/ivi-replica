import React, {FC, PropsWithChildren} from 'react';
import './TypeYear.scss'
import CreateList from "../../../CreateList/CreateList";
import Icons from "../../../Icons/Icons";
import {useTranslation} from "react-i18next";
import Button from "../../../UI/Buttons/Button/Button";
import {Carousel} from "../../../Carousel/Carousel";
import {number} from "prop-types";

interface TypeYearProps {
    allValues: number[];
    selectValues: number | string | null;
    handleChangeFilter: (item: number | null) => void;
}

const TypeYear: FC<PropsWithChildren<TypeYearProps>> = ({allValues, selectValues, handleChangeFilter}) => {
    const {t, i18n} = useTranslation();
    let isActive = !selectValues

    function createYears(value: number | null) {
        if(value === allValues[0]){
            return <div className="FilterTypeYear__selectAll"
                        onClick={() => handleChangeFilter(value)}
            >
                <div className={isActive ? 'FilterTypeYear__year_white' : 'FilterTypeYear__year selected-year'}>
                    {t('filters.filtersYears.allYears')}
                    {isActive ?
                        <Icons className='selected-year__circle-mark-checked' name='circle-checked' size='16'/> :
                        <Icons className='selected-year__circle-mark' name='circle' size='16'/>
                    }
                </div>
            </div>
        } else {
            return <div key={value}
                        className={selectValues === value ? 'FilterTypeYear__year_white' : 'FilterTypeYear__year selected-year'}
                        onClick={() => handleChangeFilter(value)}
            >
                {value}
                {selectValues === value ?
                    <Icons className='selected-year__circle-mark-checked' name='circle-checked' size='16'/> :
                    <Icons className='selected-year__circle-mark' name='circle' size='16'/>
                }
            </div>
        }
    }

    function createYearsMobile(value: number | null) {
        if(!value){
            return <Button
                type='rounded'
                color={!selectValues ? 'purple' : 'transparent' }
                title={['Все годы']}
                key={value}
                onClick={() => handleChangeFilter(value)}
            />
        } else {
            return <Button
                type='rounded'
                color={selectValues === value ? 'purple' : 'transparent' }
                title={[String(value)]}
                key={value}
                onClick={() => handleChangeFilter(value)}
            />
        }
    }

    function createMobile() {
        return(
            <div className="FilterTypeYear__scroll">
                <CreateList
                    items={allValues} renderItem={(value: number | null) =>
                    createYearsMobile(value)
                }/>
            </div>
        )
    }

    return (
        <div>
            <div data-testid='filter-block'
                 className="FilterTypeYear">
                <div className="FilterTypeYear__content">

                    <CreateList items={allValues} renderItem={(value: number) =>
                        createYears(value)
                    }/>

                </div>

                <div className="FilterTypeYear__mobile">
                    <Carousel variant='filters' children={createMobile()}/>
                </div>
            </div>

        </div>
    );
};

export default TypeYear;