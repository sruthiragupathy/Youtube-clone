import { useEffect, useState } from 'react'
import './App.css'
import { RestApiCalls } from './utils/callRestApi'
import { useVideoList } from './Context/VideoLibraryContext'
import { VideoListing } from './VideoListing/VideoListing'
import { TopNavBar } from './Navbar/TopNavBar.jsx'
import { Routes, Route } from 'react-router-dom'
import { useMyPlaylist } from './Context/MyPlaylistContext'
import { WatchLater } from './Watch Later/WatchLater'
import { Library } from './Library/Library'
import { StackedListTemplate } from './StackedListTemplate/StackedListTemplate'
import { PlayVideoPage } from './PlayVideoPage/PlayVideoPage'
import { BACKEND } from './utils/api'
import {Login} from './Login/Login';
import {SignUp} from './Login/SignUp';
import { useAuth } from './Context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

	function App() {
		const { videoLibrary, videoLibraryDispatch } = useVideoList()
		const {  myPlaylistDispatch } = useMyPlaylist()
		const [loading, setLoading] = useState(true)
		const { auth } = useAuth();
		console.log({videoLibrary})

		const fetchPlaylist = async () => {
			console.log(auth)
			const { response } = await RestApiCalls('GET', `${BACKEND}/${auth.user._id}/playlists`)
			myPlaylistDispatch({type: "SET_LIBRARY", payload: response.response})

		}

		const fetchNotes = async () => {
			const response = await axios.get(`${BACKEND}/${auth.user._id}/notes`);
			console.log({response})
			videoLibraryDispatch({type:"SET_NOTES", payload: response.data.response})
		}

		useEffect(() => {
			(async function () {
				const { response } = await RestApiCalls('GET', `${BACKEND}/videos`)
				console.log({response})
				videoLibraryDispatch({
					type: 'LOAD_VIDEOLIST',
					payload: response.response,
				})


			})()
			console.log({ auth })
		}, [])

		useEffect(() => {
			auth.user._id && fetchPlaylist() && fetchNotes()
			setLoading(false)
		}, [auth.user._id])
		return (
			<div className={`App`}>
				{videoLibrary.showModal && <div className='background-overlay'></div>}
				<TopNavBar />
				{loading ?  
					<div className = "loader">
        			<CircularProgress color = "primary"/>
      				</div>  : (
					<Routes>
						<Route path='/watchlater/:watchLaterId' element={<WatchLater />} />
						<Route path='/library/:libraryName/:libraryId' element={<StackedListTemplate />} />
						<Route path='/library' element={<Library/>} />
						<Route path='/video/:videoId' element={<PlayVideoPage/>} />
						<Route path = '/login' element = {<Login/>} />
						<Route path = '/signup' element = {<SignUp/>} />
						<Route path='/' end element={<VideoListing />} />
					</Routes>
				)}
		<Routes>
			
		</Routes>
			</div>
		)
	}

	export default App
