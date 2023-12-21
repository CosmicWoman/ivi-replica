import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonPage from "../Pages/ActorPage/PersonPage";
import MoviesPage from "../Pages/MoviesPage/MoviesPage";
import FilmPage from "../Pages/FilmPage/FilmPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { MainPage } from '../Pages/MainPage/MainPage';
import AdminPage from "../Pages/AdminPage/AdminPage";
import { AuthPage } from '../Pages/AuthPage/AuthPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';

const Router = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path={'/movies-website/person/:id'} element={<PersonPage />} />

				<Route path={'/movies-website/films/'} element={<MoviesPage />} />

				<Route path={'/movies-website/films/genre/:genre'} element={<MoviesPage />} />
				<Route path={'/movies-website/films/country/:country'} element={<MoviesPage />} />
				<Route path={'/movies-website/films/year/:year'} element={<MoviesPage />} />

				<Route path={'/movies-website/film/:id'} element={<FilmPage />} />

				<Route path={'/movies-website'} element={<MainPage />} />
				<Route path={'*'} element={<NotFoundPage />} />

				<Route path={'/movies-website/admin/'} element={<AdminPage />} />
				<Route path={'/movies-website/auth'} element={<AuthPage />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default Router;