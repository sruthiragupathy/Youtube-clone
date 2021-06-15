import { useEffect, useState } from 'react';
import './App.css';
import { RestApiCalls } from './utils/callRestApi';
import { useVideoList, useMyPlaylist, useAuth } from './Context/index';
import { VideoListing } from './VideoListing/VideoListing';
import { TopNavBar } from './Navbar/TopNavBar.jsx';
import { Routes, Route } from 'react-router-dom';
import { WatchLater } from './Watch Later/WatchLater';
import { Library } from './Library/Library';
import { StackedListTemplate } from './StackedListTemplate/StackedListTemplate';
import { PlayVideoPage } from './PlayVideoPage/PlayVideoPage';
import { BACKEND } from './utils/api';
import { Login } from './Login/Login';
import { SignUp } from './Login/SignUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { PrivateRoutes } from './Navbar/PrivateRoutes';

function App() {
	const { videoLibrary, videoLibraryDispatch } = useVideoList();
	const { myPlaylistDispatch } = useMyPlaylist();
	const [loading, setLoading] = useState(true);
	const {
		auth: { token },
	} = useAuth();

	const fetchPlaylist = async () => {
		const { data, status } = await axios({
			method: 'GET',
			url: `${BACKEND}/playlists`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200)
			myPlaylistDispatch({ type: 'SET_LIBRARY', payload: data.response });
	};

	const fetchNotes = async () => {
		const { data, status } = await axios({
			method: 'GET',
			url: `${BACKEND}/notes`,
			headers: {
				authorization: token,
			},
		});
		if (status === 200)
			videoLibraryDispatch({
				type: 'SET_NOTES',
				payload: data.response,
			});
	};

	useEffect(() => {
		(async function () {
			const { response } = await RestApiCalls('GET', `${BACKEND}/videos`);

			videoLibraryDispatch({
				type: 'LOAD_VIDEOLIST',
				payload: response.response,
			});
		})() &&
			(async function () {
				const { response } = await RestApiCalls('GET', `${BACKEND}/categories`);

				videoLibraryDispatch({
					type: 'LOAD_CATEGORIES',
					payload: response.response,
				});
			})();
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		token && fetchPlaylist() && fetchNotes();
		// setLoading(false)
	}, [token]);
	return (
		<div className={`App`}>
			{videoLibrary.showModal && <div className='background-overlay'></div>}
			<TopNavBar />
			{loading ? (
				<div className='loader'>
					<CircularProgress color='inherit' />
				</div>
			) : (
				<Routes>
					<PrivateRoutes
						path='/watchlater/:watchLaterId'
						element={<WatchLater />}
					/>
					<PrivateRoutes
						path='/library/:libraryName/:libraryId'
						element={<StackedListTemplate />}
					/>
					<PrivateRoutes path='/library' element={<Library />} />
					<Route path='/video/:videoId' element={<PlayVideoPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/' end element={<VideoListing />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
