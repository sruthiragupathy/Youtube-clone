import './VideoContainer.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {
	getIdOfAPlaylist,
	getIdsInPlaylistCategory,
	hideToast,
} from '../utils/utils';
import { useMyPlaylist } from '../Context/MyPlaylistContext';
import { useVideoList } from '../Context/VideoLibraryContext';
import { Toast } from '../Toast/Toast';
import { Modal } from '../Modal/Modal';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { BACKEND } from '../utils/api';
import { useAuth } from '../Context/AuthContext';

export const VideoContainer = ({ video, videoPlayerRef }) => {
	const { myPlaylist, myPlaylistDispatch } = useMyPlaylist();
	const { videoLibrary, videoLibraryDispatch } = useVideoList();
	const {
		auth: { token },
	} = useAuth();

	const isVideoInLibrary = (videoId, libraryId) => {
		const currentLibrary = myPlaylist.myLibrary.find(
			(library) => library._id === libraryId,
		);
		const videoIdsInCurrentLibrary = currentLibrary.videos.map(
			(video) => video._id,
		);
		return videoIdsInCurrentLibrary.includes(videoId);
	};

	const likedPlaylistId = getIdOfAPlaylist(
		myPlaylist.myLibrary,
		'Liked Videos',
	);
	const savedPlaylistId = getIdOfAPlaylist(
		myPlaylist.myLibrary,
		'Saved Videos',
	);
	const addToLibraryHandler = async (playlistCategory, libraryId, videoId) => {
		if (!token) {
			videoLibraryDispatch({
				type: 'TOGGLE_TOAST',
				payload: 'Login Toast',
				value: true,
			});
			hideToast(videoLibraryDispatch, 3000);
		} else {
			if (isVideoInLibrary(video._id, libraryId)) {
				const response = await axios({
					method: 'DELETE',
					url: `${BACKEND}/playlist/${libraryId}/${video._id}`,
					headers: {
						authorization: token,
					},
				});
				myPlaylistDispatch({
					type: 'ADD_VIDEO_TO_LIBRARY',
					payload: response.data.response,
				});
				videoLibraryDispatch({
					type: 'TOGGLE_TOAST',
					payload: `1 video removed from ${playlistCategory}`,
					value: true,
				});
				hideToast(videoLibraryDispatch);
			} else {
				const response = await axios({
					method: 'POST',
					url: `${BACKEND}/playlist/${libraryId}/${video._id}`,
					headers: {
						authorization: token,
					},
				});
				myPlaylistDispatch({
					type: 'ADD_VIDEO_TO_LIBRARY',
					payload: response.data.response,
				});
				videoLibraryDispatch({
					type: 'TOGGLE_TOAST',
					payload: `1 video added to ${playlistCategory}`,
					value: true,
				});
				hideToast(videoLibraryDispatch);
			}
		}
	};

	const saveToPlaylistHandler = (e) => {
		e.preventDefault();
		if (!token) {
			videoLibraryDispatch({
				type: 'TOGGLE_TOAST',
				payload: 'Login Toast',
				value: true,
			});
			hideToast(videoLibraryDispatch, 3000);
		} else {
			videoLibraryDispatch({ type: 'SET_SHOW_MODAL', payload: video._id });
		}
	};

	return (
		<div className='main-video__container'>
			<div>
				<ReactPlayer
					ref={videoPlayerRef}
					url={`https://www.youtube.com/embed/${video.videoId}`}
					config={{
						youtube: {
							playerVars: { showinfo: 1 },
						},
					}}
					controls
					width='100%'
					height='400px'
					title={video.title}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen></ReactPlayer>
			</div>
			<div className='main-video__description'>
				<h3 className='h3-title'>{video.title}</h3>
				<div className='video-description__row2 grey-txt'>
					<div className='grey-txt'>
						<span>{video.viewCount} • Dec 9, 2016</span>
					</div>
					<div className='row2__icons'>
						<button
							className='btn-icon'
							onClick={() =>
								addToLibraryHandler('Liked Videos', likedPlaylistId, video._id)
							}>
							{getIdsInPlaylistCategory(
								myPlaylist.myLibrary,
								'Liked Videos',
							)?.includes(video._id) ? (
								<ThumbUpAltIcon fontSize='large' color='primary' />
							) : (
								<ThumbUpAltIcon fontSize='large' className='grey-txt' />
							)}
						</button>
						<button className='btn-icon' onClick={saveToPlaylistHandler}>
							<PlaylistAddRoundedIcon fontSize='large' className='grey-txt' />
						</button>
						<button
							className='btn-icon'
							onClick={() =>
								addToLibraryHandler('Saved Videos', savedPlaylistId, video._id)
							}>
							{getIdsInPlaylistCategory(
								myPlaylist.myLibrary,
								'Saved Videos',
							)?.includes(video._id) ? (
								<BookmarkIcon fontSize='large' color='primary' />
							) : (
								<BookmarkBorderIcon fontSize='large' className='grey-txt' />
							)}
						</button>
					</div>
				</div>
				<div className='channel-description'>
					<img
						src={video.channelProfile}
						alt=''
						className='video-card__profile-pic'
					/>
					<div className='margin-left-1'>
						<div className='bold-txt'>{video.channelTitle}</div>
					</div>
				</div>
			</div>
			{videoLibrary.toast.value && <Toast />}
			{videoLibrary.showModal === video._id && <Modal video={video} />}
		</div>
	);
};
