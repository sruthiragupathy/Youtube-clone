import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext"
import { videoLibraryReducer } from "../Context/videoLibraryReducer";
import { Modal } from "../Modal/Modal";
import "./Options.css"

export const Options = ({showOptions,video}) => {
    const {videoLibrary,videoLibraryDispatch} = useVideoList();
    const {myPlaylist,myPlaylistDispatch} = useMyPlaylist();
    const closeInOptionsHandler = (e) => {
        e.preventDefault();
        videoLibraryDispatch({type:"SET_SHOW_OPTIONS",payload:"0"})
    }
    const saveToWatchLaterHandler = (e) => {
        e.preventDefault();
        myPlaylistDispatch({type:"ADD_TO_WATCH_LATER",payload:video})
        videoLibraryDispatch({type:"SET_SHOW_OPTIONS",payload:"0"})
    }
    const saveToPlaylistHandler = (e) => {
        e.preventDefault();
        videoLibraryDispatch({type:"SET_SHOW_OPTIONS",payload:"0"})
        videoLibraryDispatch({type:"SET_SHOW_MODAL",payload:video.id})
    }
    return(
        <>
        {
            showOptions && <div className = "options-container">
            <button className = "options__btn" onClick = {saveToWatchLaterHandler}><i className = "fa fa-clock-o"></i> Save to Watch later</button>
            <button className = "options__btn" onClick = {saveToPlaylistHandler}><i className = "fa fa-list"></i> Save to playlist</button>
            <button onClick = {closeInOptionsHandler} className = "options__close">
                <i className = "fa fa-close"></i>
            </button>
        </div>
        }
        {videoLibrary.overlay && <Modal video = {video}/>}

        </>
    )
}