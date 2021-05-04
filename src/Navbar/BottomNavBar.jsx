import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { getIdOfAPlaylist } from "../utils/utils";
import "./SideBar.css"
import { useAuth } from "../Context/AuthContext";

export const BottomNavBar = () => {
    const { myPlaylist } = useMyPlaylist();
    const { auth } = useAuth();
    const [hover, setHover] = useState(false)
    const wrapperRef = useRef(null);
    
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
        // console.log(privateRoutes.includes(location.pathname))
        setHover(hover => !hover);
      }
    useOutsideClickDetecter(wrapperRef);
    // console.log({myPlaylist})
    return <div className = "bottom__navbar">
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
            {/* <NavLink to = "/" className = "sidebar__nav">
            <i class="fa fa-user-circle fa-2x"></i>
            <span>Profile</span>
            </NavLink> */}
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