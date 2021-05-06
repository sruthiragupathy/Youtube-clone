import "./SideBar.css";
import {NavLink} from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { getIdOfAPlaylist } from "../utils/utils";
import { useAuth } from "../Context/AuthContext";


export const SideBar = () => {
    const { myPlaylist } = useMyPlaylist();
    const { auth } = useAuth();

    return (
    <div className = "sidebar">
            <NavLink to = "/" end className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-home fa-2x"></i>
                <span>Home</span>
            </NavLink>
            <NavLink to = {`/watchlater/${myPlaylist.myLibrary.length&&getIdOfAPlaylist(myPlaylist.myLibrary, "Watch Later")}`} className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-clock-o fa-2x"></i>
                <span>Watch Later</span>
            </NavLink>
            <NavLink to = "/library" className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-video-camera fa-2x"></i>
                <span>Library</span>
            </NavLink>
      </div>
    )
}