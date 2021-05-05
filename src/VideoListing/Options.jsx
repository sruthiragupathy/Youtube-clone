import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Modal } from "../Modal/Modal";
import { BACKEND } from "../utils/api";
import "./Options.css";


export const Options = ({ showOptions, video }) => {
  const { videoLibrary, videoLibraryDispatch } = useVideoList();
  const { myPlaylist, myPlaylistDispatch } = useMyPlaylist();
  const {auth} = useAuth();
  const navigate = useNavigate()
  const closeInOptionsHandler = (e) => {
    e.preventDefault();
    videoLibraryDispatch({ type: "SET_SHOW_OPTIONS", payload: "0" });
  };
  const saveToWatchLaterHandler = async (e) => {
    e.preventDefault();
    if(!auth.isLoggedIn) {
      navigate("/login")
    }
    else{
    const libraryId = myPlaylist.myLibrary.find(item => item.name === "Watch Later")._id
    const  response  = await axios.post(`${BACKEND}/playlist/${libraryId}/${video._id}`);
    myPlaylistDispatch({type: "ADD_VIDEO_TO_LIBRARY", payload: response.data.response})
    videoLibraryDispatch({ type: "SET_SHOW_OPTIONS", payload: "0" });
    }

  };
  const saveToPlaylistHandler = (e) => {

    e.preventDefault();
    if(!auth.isLoggedIn) {
      navigate("/login")
    }
    else{
    videoLibraryDispatch({ type: "SET_SHOW_OPTIONS", payload: "0" });
    videoLibraryDispatch({ type: "SET_SHOW_MODAL", payload: video._id });
    }
  };
  return (
    <>
      {showOptions && (
        <div className="options-container">
          <button className="options__btn" onClick={saveToWatchLaterHandler}>
            <i className="fa fa-clock-o"></i> Save to Watch later
          </button>
          <button className="options__btn" onClick={saveToPlaylistHandler}>
            <i className="fa fa-list"></i> Save to playlist
          </button>
          <button onClick={closeInOptionsHandler} className="options__close">
            <i className="fa fa-close"></i>
          </button>
        </div>
      )}
      {videoLibrary.overlay && <Modal video={video} />}
    </>
  );
};
