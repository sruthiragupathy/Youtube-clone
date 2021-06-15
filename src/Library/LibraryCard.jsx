import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context';
import { useMyPlaylist } from '../Context/MyPlaylistContext';
import { BACKEND } from '../utils/api';
const defaultPlaylists = ['Saved Videos', 'Liked Videos', 'Watch Later'];
export const LibraryCard = ({ library }) => {
	const { _id, name, videos } = library;
	const { myPlaylistDispatch } = useMyPlaylist();
	const {
		auth: { token },
	} = useAuth();

	const deletePlaylist = async (e) => {
		e.preventDefault();
		const response = await axios({
			method: 'DELETE',
			url: `${BACKEND}/playlists/${_id}`,
			headers: {
				authorization: token,
			},
		});
		myPlaylistDispatch({
			type: 'REMOVE_LIBRARY',
			payload: response.data.response,
		});
	};

	return (
		<NavLink to={`/library/${name}/${_id}`} className='list relative'>
			<div className='list__img'>
				<img
					src={`https://i.ytimg.com/vi/${videos[0]?.video?.videoId}/mqdefault.jpg`}
					alt={name}
				/>
			</div>
			<div className='list__details'>
				<div className='details__title'>{name}</div>
				<div className='details__channeltitle'>
					{videos.length === 1 ? '1 video' : `${videos.length} videos`}
				</div>
			</div>
			{!defaultPlaylists.includes(name) && (
				<button className='btn-icon br trash' onClick={deletePlaylist}>
					<i className='fa fa-trash-o fa-2x'></i>
				</button>
			)}
		</NavLink>
	);
};
