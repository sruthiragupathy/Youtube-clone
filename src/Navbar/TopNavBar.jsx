import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./TopNavBar.css";


export const TopNavBar = () => {
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
    const { auth, logoutHandler } = useAuth();
    const [hover, setHover] = useState(false)
    const wrapperRef = useRef(null);
    useOutsideClickDetecter(wrapperRef);
    const navigate = useNavigate();
    const loginHandler = () => {
    navigate('/login')
   }
    const hoverHandler = () => {
     setHover(hover => !hover)
   }
   const logout = () => {
    // console.log(privateRoutes.includes(location.pathname))
    setHover(hover => false);
  }
 
    return (
        <>
        <nav className = "top-navbar">
            <div>
            <NavLink 
          to = "/"  
          >
            <button className = "amaara-logo" 
            >
              amaara Tv
            </button>
          </NavLink>
            </div>
            <div className = "top-navbar__form">
                <input placeholder = "Search" className = "form__input"/>
                <button className = "form__btn btn-primary"><i className = "fa fa-search"></i></button>
            </div>
            {
          auth.isLoggedIn ? 
          <div onClick = {hoverHandler}  className = "purple-txt flex-center pointer">
            <span>Hi {auth?.currentUser?auth.currentUser:""}!</span>
          </div> : 
          <div className = "purple-txt pointer" onClick = {loginHandler}>LOGIN / SIGNUP</div>
        }
        </nav>
         { hover && <div className = "profile-card"  ref={wrapperRef}>
        <button className = "btn btn-outline-primary" onClick = {logout}>Logout</button>
        </div>
        }
        </>
    )
}