import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useVideoList } from '../Context';
import { useAuth } from '../Context/AuthContext';

import { BACKENDAUTH } from '../utils/api';
import { hideToast } from '../utils/utils';

import './Login.css';

const isValidEmail = (email) => {
	const emailRegex = new RegExp('[a-z][0-9]*@gmail.com');
	return emailRegex.test(email);
};

const isValidPassword = (password) => {
	const passwordRegex = new RegExp('[0-9]+');
	return password.length > 6 && passwordRegex.test(password);
};

export const SignUp = () => {
	const { auth, authDispatch } = useAuth();
	const { videoLibraryDispatch } = useVideoList();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const location = useLocation();
	const [error, setError] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [errorFromBackend, setErrorFromBackend] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		auth.token && navigate('/');
	});
	const onChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const validateForm = () => {
		setError({ firstName: '', lastName: '', email: '', password: '' });
		let validationSuccess = true;
		if (!user.firstName) {
			setError((error) => ({
				...error,
				firstName: 'Please Enter a valid name',
			}));
			validationSuccess = false;
		}
		if (!user.email || !isValidEmail(user.email)) {
			setError((error) => ({ ...error, email: 'Please Enter a valid email' }));
			validationSuccess = false;
		}
		if (!user.password || !isValidPassword(user.password)) {
			setError((error) => ({
				...error,
				password:
					'password must be 6 characters long and must contain a number',
			}));
			validationSuccess = false;
		}
		return validationSuccess;
	};
	const signUpHandler = async (from) => {
		setErrorFromBackend('');
		setLoading(true);
		if (validateForm()) {
			const response = await axios.post(`${BACKENDAUTH}/signup`, user);
			if (response.status === 200) {
				authDispatch({ type: 'SET_TOKEN', payload: response.data.token });
				authDispatch({
					type: 'SET_CURRENTUSER',
					payload: response.data.username,
				});
				localStorage.setItem(
					'logincredentials',
					JSON.stringify({
						token: response.data.token,
						userName: response.data.username,
					}),
				);
				navigate(from, { replace: true });
				videoLibraryDispatch({
					type: 'TOGGLE_TOAST',
					payload: 'Login is successful, Continue watching',
					value: true,
				});
				hideToast(videoLibraryDispatch, 3000);
			} else {
				setErrorFromBackend('User already exists');
			}
		}
		setLoading(false);
	};

	return (
		<div className='auth-wrapper flex-center'>
			<div className='login-container'>
				<h1 className='rm purple-txt login-title'>Create an account</h1>
				<div className='input-group'>
					<input
						type='text'
						className='input-area'
						name='firstName'
						placeholder='first name'
						value={user.firstName}
						onChange={onChangeHandler}
					/>
					{error.firstName && (
						<small className='red-txt'>*{error.firstName}</small>
					)}
				</div>
				<div className='input-group'>
					<input
						type='text'
						className='input-area'
						name='lastName'
						placeholder='last name'
						value={user.lastName}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='input-group'>
					<input
						type='text'
						className='input-area'
						name='email'
						placeholder='email : johndoe@gmail.com'
						value={user.email}
						onChange={onChangeHandler}
					/>
					{error.email && <small className='red-txt'>*{error.email}</small>}
				</div>
				<div className='input-group'>
					<input
						type='password'
						className='input-area'
						name='password'
						placeholder='password'
						value={user.password}
						onChange={onChangeHandler}
					/>
					{error.password && (
						<small className='red-txt'>*{error.password}</small>
					)}
				</div>
				<div className='login-btn__container'>
					<button
						className='btn btn-primary'
						onClick={() =>
							signUpHandler(location.state?.from ? location.state.from : '/')
						}>
						{loading ? 'SIGNING IN.....' : 'CREATE AN ACCOUNT'}
					</button>
					{errorFromBackend && (
						<div className='alert danger-alert'>
							<div>
								<i className='fa fa-exclamation-circle fa-2x'></i>
							</div>
							<span>{errorFromBackend}</span>
						</div>
					)}
					<small className='mb'>
						Have an account?{' '}
						<span
							className='purple-txt underline pointer'
							onClick={() => navigate('/login')}>
							Login
						</span>
					</small>
				</div>
			</div>
		</div>
	);
};
