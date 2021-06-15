import { addNoteToVideo } from '../arrayManipulation';
export const videoLibraryReducer = (
	videoLibrary,
	{ type, payload, value, editNote },
) => {
	switch (type) {
		case 'LOAD_VIDEOLIST':
			return { ...videoLibrary, videoList: payload };
		case 'LOAD_CATEGORIES':
			return { ...videoLibrary, categories: payload };
		case 'SET_NOTES':
			return { ...videoLibrary, notes: payload };
		case 'ADD_NOTE':
			return {
				...videoLibrary,
				videoList: addNoteToVideo(videoLibrary.videoList, payload, value),
			};

		case 'SET_SHOW_OPTIONS':
			return { ...videoLibrary, showOptions: payload };
		case 'SET_SHOW_MODAL':
			return { ...videoLibrary, showModal: payload };
		case 'SET_OVERLAY':
			return { ...videoLibrary, overlay: !videoLibrary.overlay };
		case 'TOGGLE_TOAST':
			return {
				...videoLibrary,
				toast: {
					value: value,
					message: payload,
				},
			};
		default:
			return videoLibrary;
	}
};
