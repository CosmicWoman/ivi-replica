import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; 
import App from "../App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../store';
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';


class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

describe('Router test-suite', () => {
    window.ResizeObserver = ResizeObserver;

    test('Route to main page check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/']}>
                <Provider store={store}> 
                    <App /> 
                </Provider>
            </MemoryRouter> 
        );

        expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    });
    test('Route to Movies page check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/films/']}>
                <Provider store={store}> 
                    <App />
                </Provider>    
            </MemoryRouter>  
        );

        expect(screen.getByTestId('moviesPage')).toBeInTheDocument();
    });
    test('Route to Film page check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/film/1']}>
                <Provider store={store}> 
                    <App />
                </Provider>
            </MemoryRouter>  
        );

        expect(screen.getByTestId('filmPage')).toBeInTheDocument();
    });
    test('Route to Person page check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/person/0']}>
                <Provider store={store}> 
                    <App />
                </Provider>
            </MemoryRouter>  
        );

        expect(screen.getByTestId('personPage')).toBeInTheDocument();
    });
    test('Route to Auth page check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/auth/']}>
                <Provider store={store}> 
                    <GoogleOAuthProvider clientId="TEST CLIENT ID">
                       <App />
                    </GoogleOAuthProvider>    
                </Provider>
            </MemoryRouter>  
        );

        expect(screen.getByTestId('authPage')).toBeInTheDocument();
    });
    test('Route to wrong page-adress check', () => {

        render(
            <MemoryRouter initialEntries={['/movies-website/asd/']}>
                <Provider store={store}> 
                    <App />
                </Provider>
            </MemoryRouter>  
        );

        expect(screen.getByTestId('notFoundPage')).toBeInTheDocument();
    });
});