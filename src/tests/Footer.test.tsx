import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; 
import App from "../App";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../store';


class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
describe('Footer test-suite', () => {
    window.ResizeObserver = ResizeObserver;

    test('Footer exists test', () => {

        render(
            <MemoryRouter>
                <Provider store={store}> 
                    <App />    
                </Provider> 
            </MemoryRouter>
        );

        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
    test('Link to main page check', () => {

        render(
            <MemoryRouter>
                <Provider store={store}> 
                    <App />    
                </Provider> 
            </MemoryRouter>
            
        );

        const mainPageLink = screen.getByTestId('footer-mainPageLink');
        fireEvent.click(mainPageLink);
        expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    });
    test('Link to movies page check',  () => {

        render(
            <MemoryRouter>
                <Provider store={store}> 
                    <App />    
                </Provider> 
            </MemoryRouter>
            
        );

        const moviesPageLink = screen.getByTestId('footer-moviesPageLink');
        
        act(() => { userEvent.click(moviesPageLink) });
        expect(screen.getByTestId('moviesPage')).toBeInTheDocument();
    });
});
