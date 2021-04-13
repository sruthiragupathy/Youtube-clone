import "./VideoContainer.css";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { getIdsInPlaylistCategory } from "../utils/utils";
import { useMyPlaylist } from "../Context/MyPlaylistContext";


export const VideoContainer = ({video}) => {
    const {snippet, id} = video;
    const {myPlaylist, myPlaylistDispatch} = useMyPlaylist();

    const addToLibraryHandler = (playlistCategory) => 
    {
        console.log(getIdsInPlaylistCategory(myPlaylist.myLibrary, playlistCategory).includes(id))
        if(getIdsInPlaylistCategory(myPlaylist.myLibrary, playlistCategory).includes(id)){
            myPlaylistDispatch({type:"REMOVE_VIDEO_FROM_LIBRARY",payload:playlistCategory,value:video.id})
        }
        else{
            myPlaylistDispatch({type:"ADD_VIDEO_TO_LIBRARY",payload:playlistCategory,value:video})
        }
    }
    return (
        <div className = "main-video__container">
            <div>
            <iframe 
            width="100%" 
            height="400" 
            src={`https://www.youtube.com/embed/${id}`}
            title={video.snippet.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen></iframe>
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
                        <button className = "btn-icon">
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
        </div>
    )
}