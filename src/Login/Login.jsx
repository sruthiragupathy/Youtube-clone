/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router';
import './Login.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useVideoList } from '../Context/VideoLibraryContext';

export const Login = () => {
	const navigate = useNavigate();
	const { auth, LoginUserWithCredentials } = useAuth();
	const location = useLocation();
	const { videoLibrary, videoLibraryDispatch } = useVideoList();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState({
		email: '',
		password: '',
	});
	const [errorFromBackend, setErrorFromBackend] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		auth.token && navigate('/');
	}, []);

	const validateForm = () => {
		setError({
			email: '',
			password: '',
		});
		let validationSuccess = true;

		if (!user.email) {
			validationSuccess = false;
		}
		if (!user.password) {
			setError((error) => ({
				...error,
				password: 'Please Enter a valid password',
			}));
			validationSuccess = false;
		}
		return validationSuccess;
	};

	const onChangeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const hideToast = () => {
		setTimeout(() => {
			videoLibraryDispatch({ type: 'TOGGLE_TOAST', payload: '', value: false });
		}, 3000);
	};
	const loginHandler = async () => {
		setErrorFromBackend('');
		setLoading(true);
		if (validateForm()) {
			const response = await LoginUserWithCredentials(
				user,
				location.state?.from ? location.state.from : '/',
			);
			if (response?.success) {
				videoLibraryDispatch({
					type: 'TOGGLE_TOAST',
					payload: 'Login is successful, Continue watching',
					value: true,
				});
				hideToast();
			}
			if (!response?.success) {
				setErrorFromBackend(response.error);
			}
		}
		setLoading(false);
	};
	return (
		<div className='auth-wrapper flex-center'>
			<div className='login-container'>
				<h1 className='rm purple-txt login-title'>Login</h1>
				<div className='input-group'>
					<input
						type='text'
						className='input-area'
						placeholder='email'
						value={user.email}
						name='email'
						onChange={onChangeHandler}
					/>
					{error.email && <small className='red-txt'>*{error.email}</small>}
				</div>
				<div className='input-group'>
					<input
						type='password'
						className='input-area'
						placeholder='password'
						value={user.password}
						name='password'
						onChange={onChangeHandler}
					/>
					{error.password && (
						<small className='red-txt'>*{error.password}</small>
					)}
				</div>
				<div className='login-btn__container'>
					{loading ? (
						<button className='btn btn-primary'>LOGGING IN...</button>
					) : (
						<button className='btn btn-primary' onClick={loginHandler}>
							LOGIN
						</button>
					)}
					{errorFromBackend && (
						<div className='alert danger-alert'>
							<div>
								<i className='fa fa-exclamation-circle fa-2x'></i>
							</div>
							<span>{errorFromBackend}</span>
						</div>
					)}
					<small className='mb'>
						Don't have an account?{' '}
						<span
							className='purple-txt underline pointer'
							onClick={() => navigate('/signup')}>
							Create an account
						</span>
					</small>
				</div>
			</div>
		</div>
	);
};
