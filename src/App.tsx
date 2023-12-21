import { useEffect } from 'react';
import './styles/App.scss'
import Router from "./components/Router/Router";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { checkToken } from './store/reducers/authReducer';


const App = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkToken())
		}
	}, [])

	return (
		<div>
			<Router />
		</div>

	);
}

export default App;

