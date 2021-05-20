import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { SearchInput } from './SearchInput';
import './TopNavBar.css';
import { isAPrivateRoute } from '../utils/utils';
export const TopNavBar = () => {
	const location = useLocation();
	const useOutsideClickDetecter = (ref) => {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					hoverHandler();
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	};
	const { auth, logoutHandler } = useAuth();
	const [hover, setHover] = useState(false);
	const wrapperRef = useRef(null);
	useOutsideClickDetecter(wrapperRef);
	const navigate = useNavigate();
	const loginHandler = () => {
		navigate('/login');
	};
	const hoverHandler = () => {
		setHover((hover) => !hover);
	};
	const logout = () => {
		setHover((hover) => false);
		logoutHandler(
			`${
				isAPrivateRoute(location.pathname)
					? '/'
					: location.pathname + location.search
					? location.search
					: ''
			}`,
		);
	};

	return (
		<>
			<nav className='top-navbar'>
				<div>
					<NavLink to='/'>
						<button className='amaara-logo'>amaara</button>
					</NavLink>
				</div>

				<SearchInput />
				{auth.isLoggedIn ? (
					<div
						onClick={hoverHandler}
						className='purple-txt flex-center pointer profile'>
						<span>Hi {auth?.currentUser ? auth.currentUser : ''}!</span>
					</div>
				) : (
					<div
						className='purple-txt pointer mobile-view-hidden'
						onClick={loginHandler}>
						LOGIN / SIGNUP
					</div>
				)}
			</nav>
			{hover && (
				<div className='profile-card' ref={wrapperRef}>
					<button className='btn btn-outline-primary' onClick={logout}>
						Logout
					</button>
				</div>
			)}
		</>
	);
};
