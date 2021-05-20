import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestApiCalls } from '../utils/callRestApi';
import { authReducer } from './authReducer';

const AuthContext = createContext();

export const getNameFromEmail = (email) => {
	return email.split('@')[0];
};

export const AuthProvider = ({ children }) => {
	const authState = {
		isLoggedIn: false,
		currentUser: '',
		loading: false,
		user: {},
	};
	const [auth, authDispatch] = useReducer(authReducer, authState);
	useEffect(() => {
		const userCredentials = JSON.parse(
			localStorage?.getItem('logincredentials'),
		);
		userCredentials?.isUserLoggedIn &&
			authDispatch({
				type: 'SET_ISLOGGEDIN',
				payload: userCredentials.isUserLoggedIn,
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
			const response = await RestApiCalls(
				'POST',
				`https://amaraapi.herokuapp.com/api/login`,
				user,
			);
			if (response?.success) {
				localStorage.setItem(
					'logincredentials',
					JSON.stringify({
						isUserLoggedIn: true,
						userName: getNameFromEmail(user.email),
						_id: response.response[0]._id,
					}),
				);
				authDispatch({ type: 'SET_ISLOGGEDIN', payload: true });
				authDispatch({
					type: 'SET_CURRENTUSER',
					payload: getNameFromEmail(user.email),
				});
				authDispatch({ type: 'SET_USER', payload: response.response[0]._id });

				navigate(pathTo, { replace: pathTo });
			}
			return response;
		} catch (err) {
			return err;
		}
	};

	const logoutHandler = (to) => {
		authDispatch({ type: 'SET_LOADING' });
		setTimeout(() => {
			localStorage?.removeItem('logincredentials');
			authDispatch({ type: 'SET_ISLOGGEDIN', payload: false });
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
