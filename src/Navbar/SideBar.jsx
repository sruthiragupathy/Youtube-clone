import "./SideBar.css";
import {NavLink} from "react-router-dom";

export const SideBar = () => {
    return (
    <div className = "sidebar">
            <NavLink to = "/" exact className = "sidebar__nav" activeClassName = "selected">
                <i className = "fa fa-home fa-2x"></i>
                <span>Home</span>
            </NavLink>
            <NavLink to = "/watchlater" className = "sidebar__nav" activeClassName = "selected">
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