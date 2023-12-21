import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import FilterButton from "./FilterButton/FilterButton";
import './filters.scss';
import FilterTwoBlocks from "./FilterTypes/FilterGenre&Countries/FilterTwoBlocks";
import ButtonReset from "./ButtonReset/ButtonReset";
import {activeFiltersProps, startFiltersProps} from "../../types/filtersTypes";
import TypeYear from "./FilterTypes/FilterYears/TypeYear";
import TypeSearch from "./FilterTypes/FilterProducer&Actor/TypeSearch";
import TypeRangeSlider from "./FilterTypes/FilterRating&Grade/TypeRangeSlider";
import {useTranslation} from "react-i18next";
import {languageFilters} from "../Pages/MoviesPage/utils";
import AxiosErrorCheck from "../../hooks/AxiosErrorCheck";

interface FiltersProps {
    activeFilters: activeFiltersProps,
    allFilters: startFiltersProps,
    selectedFilters: activeFiltersProps,
    setSelectedFilters: (selectedFilters: activeFiltersProps) => void
}

const Filters: FC<PropsWithChildren<FiltersProps>> = ({
                                                          activeFilters,
                                                          allFilters,
                                                          selectedFilters,
                                                          setSelectedFilters
                                                      }) => {
    const {t, i18n} = useTranslation();
    const [activeBlock, setActiveBlock] = useState<string[]>([])
    const [errorAxios, setErrorAxios] = useState(true)

    useEffect(() => {
        axiosCheck()
    }, [errorAxios])

    function selectedGenres(genre: string) {
        let arrGenres = selectedFilters.genres
        if (arrGenres.includes(genre)) {
            arrGenres = arrGenres.filter(genres => genres !== genre)
        } else {
            arrGenres.push(genre)
        }

        setSelectedFilters({...selectedFilters, genres: arrGenres})
    }

    function selectedCountries(country: string) {
        let arrCountries = selectedFilters.countries
        if (arrCountries.includes(country)) {
            arrCountries = arrCountries.filter(countries => countries !== country)
        } else {
            arrCountries.push(country)
        }
        setSelectedFilters({...selectedFilters, countries: arrCountries})
    }

    function selectedYears(year: number | null) {
        if (selectedFilters.years !== year) {
            setSelectedFilters({...selectedFilters, years: year})
        }
    }

    function selectedProducer(person_producer: string) {
        if (selectedFilters.producer !== person_producer) {
            setSelectedFilters({...selectedFilters, producer: person_producer})
        }
    }

    function selectedActor(person_actor: string) {
        if (selectedFilters.actor !== person_actor) {
            setSelectedFilters({...selectedFilters, actor: person_actor})
        }
    }

    function selectedRating(rating: number) {
        if (selectedFilters.rating !== rating) {
            setSelectedFilters({...selectedFilters, rating: rating})
        }
    }

    function selectedGrade(grade: number) {
        if (selectedFilters.grade !== grade) {
            setSelectedFilters({...selectedFilters, grade: grade})
        }
    }

    function axiosCheck(){
        if(errorAxios !== AxiosErrorCheck('films/')){
            setErrorAxios(AxiosErrorCheck('films/'))
        }
    }

    return (
        <div className='filters'>
            <div className="filters__content">
                <div className="filters__blocks">

                    {activeBlock.length > 0 ? <div className="close_block"
                                                   onClick={() => setActiveBlock([])}
                    ></div> : ''}

                    <FilterButton filterName={t('filters.filterButton.genre')}
                                  selectedFiltersBy={languageFilters(selectedFilters.genres, allFilters.genres, i18n.language).join(', ')}
                                  activeBlock={activeBlock}
                                  blockName='genre'
                                  setActiveBlock={setActiveBlock}>
                        <FilterTwoBlocks
                            popularValues={allFilters.popularGenres}
                            allValues={allFilters.genres}
                            selectValues={selectedFilters.genres}
                            handleChangeFilter={selectedGenres}
                        />
                    </FilterButton>

                    <FilterButton filterName={t('filters.filterButton.countries')}
                                  selectedFiltersBy={languageFilters(selectedFilters.countries, allFilters.countries, i18n.language).join(', ')}
                                  activeBlock={activeBlock}
                                  blockName='country'
                                  setActiveBlock={setActiveBlock}>
                        <FilterTwoBlocks
                            popularValues={allFilters.popularCountries}
                            allValues={allFilters.countries}
                            selectValues={selectedFilters.countries}
                            handleChangeFilter={selectedCountries}
                        />
                    </FilterButton>

                    <FilterButton filterName={t('filters.filterButton.years')}
                                  selectedFiltersBy={selectedFilters.years ? selectedFilters.years : ''}
                                  activeBlock={activeBlock}
                                  blockName='years'
                                  setActiveBlock={setActiveBlock}>
                        <TypeYear allValues={allFilters.years}
                                  selectValues={selectedFilters.years}
                                  handleChangeFilter={selectedYears}
                        />
                    </FilterButton>


                    <FilterButton filterName={t('filters.filterButton.rating')}
                                  selectedFiltersBy={selectedFilters.rating === 0 ? '' : selectedFilters.rating}
                                  activeBlock={activeBlock}
                                  blockName='rating'
                                  setActiveBlock={setActiveBlock}>
                        <TypeRangeSlider handleChangeFilter={selectedRating}
                                         blockName='rating'/>
                    </FilterButton>

                    <FilterButton filterName={t('filters.filterButton.grade')}
                                  selectedFiltersBy={selectedFilters.grade === 0 ? '' : selectedFilters.grade}
                                  activeBlock={activeBlock}
                                  blockName='grade'
                                  setActiveBlock={setActiveBlock}>
                        <TypeRangeSlider handleChangeFilter={selectedGrade}
                                         blockName='grade'/>
                    </FilterButton>

                    {errorAxios ?
                        <FilterButton filterName={t('filters.filterButton.producer')}
                                      selectedFiltersBy={selectedFilters.producer}
                                      activeBlock={activeBlock}
                                      blockName='producer'
                                      setActiveBlock={setActiveBlock}>
                            <TypeSearch handleChangeFilter={selectedProducer}
                                        professionId={2}
                                        setActiveBlock={setActiveBlock}
                            />
                        </FilterButton> : ''}

                    {errorAxios ?
                        <FilterButton filterName={t('filters.filterButton.actor')}
                                      selectedFiltersBy={selectedFilters.actor}
                                      activeBlock={activeBlock}
                                      blockName='actor'
                                      setActiveBlock={setActiveBlock}>
                            <TypeSearch handleChangeFilter={selectedActor}
                                        professionId={1}
                                        setActiveBlock={setActiveBlock}
                            />
                        </FilterButton> : ''
                    }
                </div>

                <div className="filters__button">
                    <ButtonReset
                        activeFilters={activeFilters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}/>
                </div>
            </div>
        </div>

    );
};

export default Filters;