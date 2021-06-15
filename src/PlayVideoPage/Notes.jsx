import './Notes.css';
import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useVideoList } from '../Context/VideoLibraryContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { BACKEND } from '../utils/api';
import { useAuth } from '../Context/AuthContext';
import { formatTime } from '../arrayManipulation';
export const Notes = ({ video, videoPlayerRef }) => {
	const { videoLibrary, videoLibraryDispatch } = useVideoList();

	const [edit, setEdit] = useState(false);
	const [editNote, setEditNote] = useState('');
	const [note, setNote] = useState('');
	const onChangeHandler = (e) => {
		setNote(e.target.value);
	};
	const {
		auth: { token },
	} = useAuth();
	const addNoteHandler = async (e) => {
		e.preventDefault();
		if (!edit) {
			const response = await axios({
				method: 'POST',
				url: `${BACKEND}/notes/${video._id}`,
				data: {
					note: note,
					time: formatTime(videoPlayerRef.current.getCurrentTime()),
				},
				headers: {
					authorization: token,
				},
			});
			videoLibraryDispatch({
				type: 'SET_NOTES',
				payload: response.data.response,
			});
		} else {
			const response = await axios({
				method: 'POST',
				url: `${BACKEND}/notes/${video._id}/${editNote}`,
				data: { note: note },
				headers: {
					authorization: token,
				},
			});
			videoLibraryDispatch({
				type: 'SET_NOTES',
				payload: response.data.response,
			});
			setEdit((edit) => !edit);
			setEditNote('');
		}
		setNote(() => '');
	};
	const getNotes = (videoId) => {
		return videoLibrary.notes.find((item) => item.videoId === videoId)?.notes;
	};
	const editNotes = (note) => {
		setNote(() => note.note);
		setEdit(() => true);
		setEditNote(() => note._id);
	};

	const deleteNote = async (noteId) => {
		const response = await axios({
			method: 'DELETE',
			url: `${BACKEND}/notes/${video._id}/${noteId}`,
			headers: {
				authorization: token,
			},
		});
		videoLibraryDispatch({
			type: 'SET_NOTES',
			payload: response.data.response,
		});
	};
	return (
		<div className='form-container'>
			<h4>Take Notes</h4>
			<form className='input-container' onSubmit={addNoteHandler}>
				<input
					type='text'
					className='take-note'
					name='note'
					value={note}
					placeholder='Take A Note'
					autoFocus
					onChange={onChangeHandler}
				/>
				<button
					className={`add-note-btn ${token ? '' : 'disabled'}`}
					type='submit'>
					<AddIcon />
				</button>
			</form>
			{!token && <div className='light-grey-txt'>"Login to take notes"</div>}

			{videoLibrary.videoList.length &&
				(getNotes(video._id)
					? getNotes(video._id).map((note) => {
							return (
								<div className='note' key={note._id} id={note._id}>
									<div className='flex1'>
										<span>{note.note}</span>
										<span className='small-txt'>
											<i className='fa fa-clock-o'></i> {note.time}
										</span>
									</div>
									<div className='flex-center'>
										<button
											className='btn-transparent edit'
											onClick={() => editNotes(note)}>
											<EditIcon />
										</button>
										<button
											className='btn-transparent delete-note'
											onClick={() => deleteNote(note._id)}>
											<DeleteIcon />
										</button>
									</div>
								</div>
							);
					  })
					: null)}
		</div>
	);
};
