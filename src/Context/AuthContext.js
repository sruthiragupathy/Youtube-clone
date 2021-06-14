import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKENDAUTH } from '../utils/api';
import { RestApiCalls } from '../utils/callRestApi';
import { authReducer } from './authReducer';

const AuthContext = createContext();

export const getNameFromEmail = (email) => {
	return email.split('@')[0];
};

export const AuthProvider = ({ children }) => {
	const authState = {
		token: '',
		userName: '',
		loading: false,
	};
	const [auth, authDispatch] = useReducer(authReducer, authState);
	useEffect(() => {
		const userCredentials = JSON.parse(
			localStorage?.getItem('logincredentials'),
		);
		userCredentials?.token &&
			authDispatch({
				type: 'SET_TOKEN',
				payload: userCredentials.token,
			});
		userCredentials?.userName &&
			authDispatch({
				type: 'SET_CURRENTUSER',
				payload: userCredentials.userName,
			});
		userCredentials?._id &&
			authDispatch({ type: 'SET_USER', payload: userCredentials._id });
	}, []);
	const navigate = useNavigate();

	const LoginUserWithCredentials = async (user, pathTo) => {
		try {
			const { data, status } = await axios.post(`${BACKENDAUTH}/login`, user);
			if (status === 200) {
				localStorage.setItem(
					'logincredentials',
					JSON.stringify({
						token: data.token,
						userName: data.username,
					}),
				);
				authDispatch({ type: 'SET_TOKEN', payload: data.token });
				authDispatch({
					type: 'SET_CURRENTUSER',
					payload: data.username,
				});

				navigate(pathTo, { replace: pathTo });
			}
			return data;
		} catch (err) {
			return err;
		}
	};

	const logoutHandler = (to) => {
		authDispatch({ type: 'SET_LOADING' });
		setTimeout(() => {
			localStorage?.removeItem('logincredentials');
			authDispatch({ type: 'SET_TOKEN', payload: false });
			authDispatch({ type: 'SET_LOADING' });
			authDispatch({ type: 'RESET_USER' });
			navigate(to ? to : '/');
		}, 2000);
	};
	return (
		<AuthContext.Provider
			value={{ auth, authDispatch, LoginUserWithCredentials, logoutHandler }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
