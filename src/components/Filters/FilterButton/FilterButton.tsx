import React, {FC, PropsWithChildren} from 'react';
import './FilterButton.scss'
import Icons from "../../Icons/Icons";

interface FilterButtonProps {
    filterName: string;
    selectedFiltersBy: string | number;
    activeBlock: string[];
    blockName: string;
    setActiveBlock: (activeBlockName:string[]) => void;
}

const FilterButton: FC<PropsWithChildren<FilterButtonProps>> = (
    {
        filterName,
        selectedFiltersBy,
        activeBlock,
        blockName,
        setActiveBlock,
        children
    }
) => {

    let isActive = activeBlock.includes(blockName)

    function activeBl() {
        let result = activeBlock.filter(item => item !== blockName)
        setActiveBlock(result)
    }

    return (
        <div className="filterButton" >
            <div className="filterButton__container">
                <div data-testid='filters-block' className={isActive ? "filterButton__content content-active" : "filterButton__content"}
                     onClick={() => {isActive ? setActiveBlock([]) : setActiveBlock([blockName])}}
                >
                    <div className="filterButton__header">
                        <div className="filterButton__title">
                            {filterName}
                        </div>
                        {selectedFiltersBy && <div className="filterButton__subtitle">
                            {selectedFiltersBy}
                        </div>}
                    </div>
                    <div className={isActive ? "filterButton__arrow_reverse" : "filterButton__arrow"
                    }>
                        <Icons name='chevron-down' size='16'/>
                    </div>
                </div>
                <div data-testid='filter-result'
                     className="filterButton__menu">
                    {isActive && children}
                </div>
            </div>

            <div className="filterButton__mobile">

                <div className="filterButton__btn-header btn-header"
                     onClick={() => {isActive ? activeBl() : setActiveBlock([...activeBlock, blockName])}}
                >
                    <div className="btn-header__title">
                        {filterName}
                    </div>
                    <div className={isActive ? "btn-header__arrow_reverse" : "btn-header__arrow"
                    }>
                        <Icons name='chevron-down' size='16'/>
                    </div>
                </div>
                <div className="filterButton__menu">
                    {isActive && children}
                </div>

            </div>
        </div>
    );
};

export default FilterButton;