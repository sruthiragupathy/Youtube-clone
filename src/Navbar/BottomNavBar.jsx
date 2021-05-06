import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { getIdOfAPlaylist } from "../utils/utils";
import "./SideBar.css"
import { useAuth } from "../Context/AuthContext";
import {isAPrivateRoute} from "../utils/utils"

export const BottomNavBar = () => {
    const { myPlaylist } = useMyPlaylist();
    const { auth, logoutHandler } = useAuth();
    const [hover, setHover] = useState(false)
    const wrapperRef = useRef(null);
    const location = useLocation();
    const useOutsideClickDetecter = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    hoverHandler()
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
      }
      const hoverHandler = () => {
        setHover(hover => !hover)
      }

        const logout = () => {
            setHover(hover => false);
            logoutHandler(`${isAPrivateRoute(location.pathname) ? "/" : location.pathname+location.search?location.search:""}`)
            
          }
      
    useOutsideClickDetecter(wrapperRef);

    return <div className = "bottom__navbar">
            <NavLink to = "/" end className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-home fa-2x"></i>
                <span>Home</span>
            </NavLink>
            <NavLink to = {auth.isLoggedIn?`/watchlater/${myPlaylist.myLibrary.length&&getIdOfAPlaylist(myPlaylist.myLibrary, "Watch Later")}`:"/login"} className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-clock-o fa-2x"></i>
                <span>Watch Later</span>
            </NavLink>
            <NavLink to = {auth.isLoggedIn?"/library":"/login"} className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-video-camera fa-2x"></i>
                <span>Library</span>
            </NavLink>
            {auth.user._id ? <div  className = "sidebar__nav" onClick = {hoverHandler}>
                <i className="fa fa-user-circle fa-2x"></i>
                <span>Profile</span>
            </div>
            :
            <NavLink to = "/Login" className = "sidebar__nav" activeClassName = "selected">
                <i className="fa fa-user-circle fa-2x"></i>
                <span>Login</span>
            </NavLink>
            
            }
            {hover && <div className = "mobile-profile"  ref={wrapperRef}>
                <button className = "btn btn-outline-primary width-100" onClick = {logout}>Logout</button>
            </div>}
      </div>
    
}