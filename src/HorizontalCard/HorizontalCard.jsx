import axios from 'axios';
import { useAuth } from '../Context';
import { useMyPlaylist } from '../Context/MyPlaylistContext';
import { BACKEND } from '../utils/api';
import './HorizontalCard.css';

export const HorizontalCard = ({ video, libraryId }) => {
	const { videoId, title, channelTitle } = video;
	const { myPlaylistDispatch } = useMyPlaylist();
	const {
		auth: { token },
	} = useAuth();

	const deleteFromPlaylist = async (e) => {
		e.preventDefault();
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
	};
	return (
		<div className='list relative'>
			<div className='list__img'>
				<img
					src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
					alt={title}
				/>
			</div>
			<div className='list__details'>
				<div className='details__title'>{title}</div>
				<div className='details__channeltitle'>{channelTitle}</div>
			</div>
			<button class='btn-icon br trash' onClick={deleteFromPlaylist}>
				<i class='fa fa-trash-o fa-2x'></i>
			</button>
		</div>
	);
};
