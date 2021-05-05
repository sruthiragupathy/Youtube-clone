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
import { PrivateRoutes } from './Navbar/PrivateRoutes'

	function App() {
		const { videoLibrary, videoLibraryDispatch } = useVideoList()
		const {  myPlaylistDispatch } = useMyPlaylist()
		const [loading, setLoading] = useState(true)
		const { auth } = useAuth();


		const fetchPlaylist = async () => {

			const { response } = await RestApiCalls('GET', `${BACKEND}/${auth.user._id}/playlists`)
			myPlaylistDispatch({type: "SET_LIBRARY", payload: response.response})

		}

		const fetchNotes = async () => {
			const response = await axios.get(`${BACKEND}/${auth.user._id}/notes`);

			videoLibraryDispatch({type:"SET_NOTES", payload: response.data.response})
		}

		useEffect(() => {
			(async function () {
				const { response } = await RestApiCalls('GET', `${BACKEND}/videos`)

				videoLibraryDispatch({
					type: 'LOAD_VIDEOLIST',
					payload: response.response,
				})


			})() && 
			(async function () {
				const { response } = await RestApiCalls('GET', `${BACKEND}/categories`)

				videoLibraryDispatch({
					type: 'LOAD_CATEGORIES',
					payload: response.response,
				})


			})()
			setTimeout(() => {
				setLoading(false)
			},2000)
		}, [])

		useEffect(() => {
			auth.user._id && fetchPlaylist() && fetchNotes()
			// setLoading(false)
		}, [auth.user._id])
		return (
			<div className={`App`}>
				{videoLibrary.showModal && <div className='background-overlay'></div>}
				<TopNavBar />
				{loading ?  
					<div className = "loader">
        			<CircularProgress color = "inherit"/>
      				</div>  : (
					<Routes>
						<PrivateRoutes path='/watchlater/:watchLaterId' element={<WatchLater />} />
						<PrivateRoutes path='/library/:libraryName/:libraryId' element={<StackedListTemplate />} />
						<PrivateRoutes path='/library' element={<Library/>} />
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
