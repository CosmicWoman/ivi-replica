import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import Filters from "../../components/Filters/Filters";
import {activeFilters, arrAllFiltersTest} from "../../types/filtersTypes";
import _ from "lodash";
import axios from "axios";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import FilmCard from "../../components/FilmCard/FilmCard";
import Filmography from "../../components/Pages/ActorPage/FilmographyFiltrs/Filmography";
import CreateEnd from "../../components/UI/CreateEnding/CreateEnd";
import ShortMovieCard from "../../components/Pages/ActorPage/ShortMovieCard/ShortMovieCard";
import {number} from "prop-types";
import PersonHeader from "../../components/Pages/ActorPage/PersonHeader/PersonHeader";

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

describe('PersonPage tests', () => {
    let response:any;
    beforeEach( () => {
        response = {
            key: 14,
            poster: 'https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg',
            nameRu: 'Ала',
            nameEn: 'Ala',
            year: 2011,
            rating: 8.234,
        }})

    test('declension check', () => {

        render(
            <CreateEnd number={24} wordOne={'фильм'} wordTwo={'фильмов'} wordThree={'фильма'} wordEn={'films'}/>
        );
        const filmography = screen.getByTestId('filmography-word');
        expect(filmography).toHaveTextContent('фильма')
    })

    test('data display check', () => {
        function Pseudo(){}

        render(
            <ShortMovieCard film={response} route={() => Pseudo()}/>
        );
        const shortMovieCard = screen.getByTestId('shortMovieCard');
        expect(shortMovieCard).toHaveTextContent('2011')
    })
})

describe('PersonPage-header tests', () => {
    let response:any;
    beforeEach( () => {
        response = {
            id: 13,
            nameRu: 'Ала',
            nameEn: '',
            photo: '',
        }})

    test('name mapping check', () => {

        render(
            <PersonHeader person={response}/>
        );
        const personHeader = screen.getByTestId('personHeader');
        expect(personHeader).toHaveTextContent('Ала');
        expect(personHeader).not.toHaveTextContent('Ala');
    })
})