import { useEffect, useState } from 'react'
import './App.css'
import { RestApiCalls } from './utils/callRestApi'
import { useVideoList } from './Context/VideoLibraryContext'
import { VideoListing } from './VideoListing/VideoListing'
import { TopNavBar } from './Navbar/TopNavBar.jsx'
import { Switch, Route } from 'react-router-dom'
// import { useMyPlaylist } from './Context/MyPlaylistContext'
import { WatchLater } from './Watch Later/WatchLater'
import { Library } from './Library/Library'
import { StackedListTemplate } from './StackedListTemplate/StackedListTemplate'
import { PlayVideoPage } from './PlayVideoPage/PlayVideoPage'
import { BACKEND } from './utils/api'

function App() {
	const { videoLibrary, videoLibraryDispatch } = useVideoList()
	// const { myPlaylist, myPlaylistDispatch } = useMyPlaylist()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async function () {
			const { response } = await RestApiCalls('GET', `${BACKEND}/videos`)
			// console.log(response);
			videoLibraryDispatch({
				type: 'LOAD_VIDEOLIST',
				payload: response.response,
			})
		  setLoading(false)

		})()
		// console.log({ videoLibrary })
	}, [])
	console.log(videoLibrary.showModal)
	return (
		<div className={`App`}>
			{videoLibrary.showModal && <div className='background-overlay'></div>}
			<TopNavBar />
			{loading ? (
				<p>Data not loaded yet</p>
			) : (
				<Switch>
					<Route path='/' exact component={VideoListing} />
					<Route path='/watchlater' component={WatchLater} />
					<Route path='/library/:libraryName' component={StackedListTemplate} />
					<Route path='/library' component={Library} />
					<Route path='/video/:videoId' component={PlayVideoPage} />
				</Switch>
			)}
		</div>
	)
}

export default App
