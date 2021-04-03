import {createContext,useContext,useReducer} from "react";
import { videoLibraryReducer } from "./videoLibraryReducer";

const VideoLibraryContext = createContext();


export const VideoLibraryProvider = ({children}) => {
    const [videoLibrary,videoLibraryDispatch] = useReducer(videoLibraryReducer,{
        videoList:[],
        likedList:[]
    })
    return (
        <VideoLibraryContext.Provider value = {{videoLibrary,videoLibraryDispatch}}>
            {children}
        </VideoLibraryContext.Provider>
    )
}


export const useVideoList = () => {
    return useContext(VideoLibraryContext);
}