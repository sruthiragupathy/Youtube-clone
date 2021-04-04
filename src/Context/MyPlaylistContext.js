import {createContext,useContext,useReducer} from "react";
import { myPlaylistReducer } from "./myPlaylistReducer";
import { v4 as uuidv4 } from 'uuid';


const MyPlayListContext = createContext();

export const MyPlayListProvider = ({children}) => {
    const [myPlaylist,myPlaylistDispatch] = useReducer(myPlaylistReducer,{
        watchLaterList:[],
        myLibrary:[{id:uuidv4(),checked:false,name:"fashion",videoList:[]}],
        likedList:[],
        subscribedList:[]
    })
    return (
        <MyPlayListContext.Provider value = {{myPlaylist,myPlaylistDispatch}}>
            {children}
        </MyPlayListContext.Provider>
    )
}

export const useMyPlaylist = () => {
    return useContext(MyPlayListContext);
}


