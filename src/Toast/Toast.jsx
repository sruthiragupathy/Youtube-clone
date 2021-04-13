
import { useEffect } from "react";
import { useVideoList } from "../Context/VideoLibraryContext";
import "./Toast.css"
export const Toast = () => {
    const { videoLibrary, videoLibraryDispatch } = useVideoList();
    useEffect( () => {
        setTimeout( () => {
            videoLibraryDispatch({ type: "TOGGLE_TOAST", payload:"videoLibrary.toast.message"})
        },1000)
    }, [])
    return (
        <div className = {`toast ${videoLibrary.toast.value ? "show-toast" : ""}`}>{videoLibrary.toast.message} 
        </div>
    )
}