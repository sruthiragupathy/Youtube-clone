import "./VideoContainer.css";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { getIdsInPlaylistCategory } from "../utils/utils";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Toast } from "../Toast/Toast";
import { Modal } from "../Modal/Modal";
import ReactPlayer from 'react-player'

export const VideoContainer = ({video, videoPlayerRef}) => {
    const { snippet, id } = video;
    const { myPlaylist, myPlaylistDispatch } = useMyPlaylist();
    const { videoLibrary,videoLibraryDispatch } = useVideoList();

    const addToLibraryHandler = (playlistCategory) => 
    {
        if(getIdsInPlaylistCategory(myPlaylist.myLibrary, playlistCategory).includes(id)){
            myPlaylistDispatch({type:"REMOVE_VIDEO_FROM_LIBRARY",payload:playlistCategory,value:video.id})
            videoLibraryDispatch({ type:"TOGGLE_TOAST", payload: `1 video removed from ${playlistCategory}` })
        }
        else{
            myPlaylistDispatch({type:"ADD_VIDEO_TO_LIBRARY",payload:playlistCategory,value:video})
            videoLibraryDispatch({ type:"TOGGLE_TOAST", payload: `1 video added to ${playlistCategory}` })
        }
    }

    const saveToPlaylistHandler = (e) => {
        e.preventDefault();
        videoLibraryDispatch({type:"SET_SHOW_MODAL",payload:video.id})
    }
    console.log("currentTime", videoPlayerRef)

    const getCurrentTime = () => {
    console.log(videoPlayerRef.current.getCurrentTime());
    }
    return (
        <div className = "main-video__container">
            <div>
            <ReactPlayer
                ref = {videoPlayerRef}
                url = {`https://www.youtube.com/embed/${id}`}
                config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                    }
                }}
                controls
                width='100%'
                height='400px'
                title={video.snippet.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                onStart={() => console.log('onStart')}
                ></ReactPlayer>
            </div>
            <div className = "main-video__description">
                <h3>{snippet.title}</h3>
                <div className = "video-description__row2 grey-txt">
                    <div className = "grey-txt">
                        <span>1,158,375 views • Dec 9, 2016</span>
                    </div>
                    <div className = "row2__icons">
                        <button className = "btn-icon" onClick = {() => addToLibraryHandler("Liked Videos")}>
                            {
                                getIdsInPlaylistCategory(myPlaylist.myLibrary, "Liked Videos").includes(id)  ?
                                <ThumbUpAltIcon fontSize = "large" color = "primary"/> :
                                <ThumbUpAltIcon fontSize = "large" className = "grey-txt"/>
                            }
                        </button>
                        <button className = "btn-icon" onClick = {saveToPlaylistHandler}>
                            <PlaylistAddRoundedIcon fontSize = "large" className = "grey-txt"/>
                        </button>
                        <button className = "btn-icon" onClick = {() => addToLibraryHandler("Saved Videos")}>
                            {
                                getIdsInPlaylistCategory(myPlaylist.myLibrary, "Saved Videos").includes(id)  ?
                                <BookmarkIcon fontSize = "large" color = "primary"/> :
                                <BookmarkBorderIcon fontSize = "large" className = "grey-txt"/>
                            }
                        </button>
                    </div>
                </div>
                <div className = "channel-description">
                    <img src={snippet.imageURL} alt="" className = "video-card__profile-pic"/>
                    <div className = "margin-left-1">
                    <div className = "bold-txt">{snippet.channelTitle}</div>
                    </div>
                </div>
             </div>
            { videoLibrary.toast.value && <Toast/> }
            { videoLibrary.showModal === id && <Modal video = {video}/> }
        </div>
    )
}