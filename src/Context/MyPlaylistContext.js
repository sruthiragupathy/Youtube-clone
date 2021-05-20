import { createContext, useContext, useReducer } from 'react';
import { myPlaylistReducer } from './myPlaylistReducer';

const MyPlayListContext = createContext();

export const MyPlayListProvider = ({ children }) => {
	const [myPlaylist, myPlaylistDispatch] = useReducer(myPlaylistReducer, {
		myLibrary: [],
	});
	return (
		<MyPlayListContext.Provider value={{ myPlaylist, myPlaylistDispatch }}>
			{children}
		</MyPlayListContext.Provider>
	);
};

export const useMyPlaylist = () => {
	return useContext(MyPlayListContext);
};
