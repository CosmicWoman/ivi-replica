import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import './i18n';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<GoogleOAuthProvider clientId='142143860082-0gfucvqh2beeq86avnqctb4vhng4ttmh.apps.googleusercontent.com'>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</GoogleOAuthProvider>

);

