import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import Filters from "../../components/Filters/Filters";
import {activeFilters, arrAllFiltersTest} from "../../types/filtersTypes";
import _ from "lodash";
import axios from "axios";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import FilmCard from "../../components/FilmCard/FilmCard";
import { Provider } from "react-redux";
import { store } from '../../store';

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    }
})

describe('MoviesPage tests', () => {
    window.ResizeObserver = ResizeObserver;
    let response:any;
    beforeEach( () => {
        response = {
            data: arrAllFiltersTest
        }})

    test('not opening filters', () => {
        function setSelectedFilters(){
        }

        render(
            <BrowserRouter>
                <Filters activeFilters={activeFilters}
                         allFilters={arrAllFiltersTest}
                         selectedFilters={_.cloneDeep(activeFilters)}
                         setSelectedFilters={setSelectedFilters}/>
            </BrowserRouter>
        );
        const filtersResult = screen.getAllByTestId('filter-result');
        expect(filtersResult[2]).toHaveTextContent('')
    })

    test('open filters', () => {
        function setSelectedFilters(){
        }

        render(
            <BrowserRouter>
                <Filters activeFilters={activeFilters}
                         allFilters={arrAllFiltersTest}
                         selectedFilters={_.cloneDeep(activeFilters)}
                         setSelectedFilters={setSelectedFilters}/>

            </BrowserRouter>
        );
        const filtersBlock = screen.getAllByTestId('filters-block');
        expect(filtersBlock[0]).not.toHaveClass('content-active');
        fireEvent.click(filtersBlock[0]);
        expect(filtersBlock[0]).toHaveClass('content-active')
    })
})

describe('FilmCard tests', () => {
    window.ResizeObserver = ResizeObserver;
    let response:any;
    beforeEach( () => {
        response = {
                "id": 114,
                "rating": 8.805,
                "grade": 1571449,
                "filmLength": 112,
                "NameRu": "1+1",
                "NameEn": "Intouchables",
                "poster": "https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg",
                "year": 2011,
        }})

    test('FilmCard active icons', () => {
        function setSelectedFilters(){}

        render(
            <BrowserRouter>
                <Provider store={store}> 
                    <FilmCard icons={true}
                            film={response}
                            onClick={() => setSelectedFilters()}/>
                </Provider>  
            </BrowserRouter>
        );

        expect(screen.getByTestId('icons')).toBeInTheDocument();
    })

    test('FilmCard active poster', () => {
        function setSelectedFilters(){}

        render(
            <BrowserRouter>
                <Provider store={store}> 
                    <FilmCard icons={true}
                            film={response}
                            onClick={() => setSelectedFilters()}/>
                </Provider>  
            </BrowserRouter>
        );

        expect(screen.getByTestId('film-card-img')).toBeInTheDocument();
    })

    test('filmCard', () => {
        function setSelectedFilters(){}

        render(
            <BrowserRouter>
                <Provider store={store}> 
                    <FilmCard icons={true}
                            film={response}
                            onClick={() => setSelectedFilters()}/>
                </Provider> 
            </BrowserRouter>
        );

        const info = screen.getByTestId('film-card-info');
        expect(info).toHaveTextContent('8,8');
    })

})
