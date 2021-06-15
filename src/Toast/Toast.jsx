import { Link } from 'react-router-dom';
import { useVideoList } from '../Context/VideoLibraryContext';
import './Toast.css';

export const Toast = () => {
	const { videoLibrary } = useVideoList();
	return videoLibrary.toast.message === 'Login Toast' ? (
		<div className={`toast ${videoLibrary.toast.message ? 'show-toast' : ''}`}>
			You are not logged in, Please
			<Link to='/login' className='toast-login'>
				{' '}
				LOGIN
			</Link>
		</div>
	) : (
		<div className={`toast ${videoLibrary.toast.value ? 'show-toast' : ''}`}>
			{videoLibrary.toast.message}
		</div>
	);
};
