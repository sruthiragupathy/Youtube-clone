import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
// import {videoLibrary} from "../database";
import { VideoContainer } from './VideoContainer';
import './PlayVideoPage.css';
import { Notes } from './Notes';
import axios from 'axios';
import { BACKEND } from '../utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BottomNavBar } from '../Navbar/BottomNavBar';
import { SideBar } from '../Navbar/SideBar';

export const PlayVideoPage = () => {
	const { videoId } = useParams();
	const [video, setVideo] = useState();

	const videoPlayerRef = useRef();

	useEffect(() => {
		(async function () {
			try {
				const response = await axios.get(`${BACKEND}/video/${videoId}`);
				// if(response.status === 200) {
				console.log({ response });
				setVideo(response.data.response);
			} catch (error) {
				console.log(error.message);
			}
		})();
	}, []);

	return (
		<div>
			<BottomNavBar />
			<SideBar />
			{video ? (
				<div className='main-video-page'>
					<VideoContainer video={video} videoPlayerRef={videoPlayerRef} />
					<Notes video={video} videoPlayerRef={videoPlayerRef} />
				</div>
			) : (
				<div className='loader'>
					<CircularProgress color='primary' />
				</div>
			)}
		</div>
	);
};
