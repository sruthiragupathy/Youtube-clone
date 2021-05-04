import axios from "axios";
import {NavLink} from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { BACKEND } from "../utils/api";
const defaultPlaylists = ["Saved Videos", "Liked Videos", "Watch Later"];
export const LibraryCard = ({library}) => {
    const {_id,name,videos} = library;
    const {myPlaylistDispatch} = useMyPlaylist();


    const deletePlaylist = async (e) => {
        e.preventDefault();
        console.log("delete")
        const response = await axios.delete(`${BACKEND}/playlists/${_id}`)
       console.log({response})
       myPlaylistDispatch({type: "REMOVE_LIBRARY", payload: response.data.response})
    }


    return (
        
            <NavLink to = {`/library/${name}/${_id}`} className = "list relative">
            <div className = "list__img">
                <img src = {`https://i.ytimg.com/vi/${videos[0].video.videoId}/mqdefault.jpg`} alt = {name}/>
            </div>
            <div className = "list__details">
                <div className = "details__title">{name}</div>
                <div className = "details__channeltitle">{videos.length === 1 ? "1 video" : `${videos.length} videos`}</div>
            </div>
            {/* <button className = "btn-options br" onClick = {moreOptionHandler}>
                <i className = "fa fa-ellipsis-v"></i>
            </button>
            

            <div className = "horizontal-card__option">
                <button className = "btn-transparent">Remove from playlist</button>
            </div> */}
            {!defaultPlaylists.includes(name) && <button className = "btn-icon br trash" onClick = {deletePlaylist}>
                <i className ="fa fa-trash-o fa-2x"></i>
            </button>}
            </NavLink>
    
        
        
    )
}