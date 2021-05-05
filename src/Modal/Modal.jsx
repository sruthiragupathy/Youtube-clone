import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useState } from "react";

import "./Modal.css";
import { useVideoList } from "../Context/VideoLibraryContext";

import { BACKEND } from "../utils/api";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export const Modal = ({ video }) => {

  const {auth} = useAuth()
  const { myPlaylist, myPlaylistDispatch } = useMyPlaylist();
  const { videoLibraryDispatch } = useVideoList();
  const [openForm, setOpenForm] = useState(false);
  const [newLibrary, setNewLibrary] = useState("");
  const [error, setError] = useState("");

  const createNewPlaylistHandler = (e) => {
    e.preventDefault();
    setOpenForm(true);
    // inputEl.current.focus();

  };
  const closeHandler = (e) => {
    e.preventDefault();
    videoLibraryDispatch({ type: "SET_SHOW_MODAL", payload: "" });
    myPlaylistDispatch({ type: "SET_ALL_CHECKED_TO_FALSE" });
  };
  const checkboxHandler = async (libraryId, videoId) => {
    console.log({libraryId, videoId})
    // e.preventDefault();
    // e.stopPropagation();
    if(isVideoInLibrary(videoId,libraryId)) {
      const  response  = await axios.delete(`${BACKEND}/playlist/${libraryId}/${videoId}`);
      console.log( response.data.response.videos);
      myPlaylistDispatch({type: "ADD_VIDEO_TO_LIBRARY", payload: response.data.response})
    }
    else {
      const  response  = await axios.post(`${BACKEND}/playlist/${libraryId}/${videoId}`);
      myPlaylistDispatch({type: "ADD_VIDEO_TO_LIBRARY", payload: response.data.response})
    }
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setError("");
    setNewLibrary(e.target.value);
  };

  const createNewLibrary = async (e) => {
    e.preventDefault();
    if (newLibrary) {
      const response = await axios.post(`${BACKEND}/${auth.user._id}/playlists/${video._id}`, {name: newLibrary})
      console.log({response})
      myPlaylistDispatch({type: "ADD_NEW_LIBRARY", payload: response.data.response})
      setNewLibrary("");
    } else {
      setError("*input field is empty");
    }
  };

  const isVideoInLibrary = (videoId, libraryId) => {
    const currentLibrary = myPlaylist.myLibrary.find( library => library._id === libraryId);
    const videoIdsInCurrentLibrary = currentLibrary.videos.map(video => video._id)
    return videoIdsInCurrentLibrary.includes(videoId)
  }

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && newLibrary) {
  //     createNewLibraryHandler();
  //   }
  // };
  return (
    <div className="modal">
      <div className="save flex">
        <div>Save to...</div>
        <button className="close-btn" onClick={closeHandler}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="library-list">
        {
        myPlaylist.myLibrary.length? 
        myPlaylist.myLibrary.map((library) => {
          return (
            <div className="library" key={library._id}>
              <label className = "pointer">
              <input
                type="checkbox"
                checked={isVideoInLibrary(video._id,library._id)}
                className="checkbox"
                name={library.name}
                onChange={(e) => checkboxHandler(library._id, video._id)}
              />
              {library.name}</label>
            </div>
          );
        }) : null
        } 
      </div>

      {openForm ? (
        <form className="new_playlist" onSubmit = {createNewLibrary}>
          <input
            placeholder="Enter Playlist Name"
            className="new-playlist__input"
            value={newLibrary}
            onChange={inputChangeHandler}
            />
          {error && <div className="error">{error}</div>}
          <div className="create-btn-container">
            <button
              type = "submit"
              className="form__create-btn"

            >
              CREATE
            </button>
          </div>
        </form>
      ) : (
        <div className="new_playlist">
          <button className="create-btn" onClick={createNewPlaylistHandler}>
            <span className="plus">+</span>
            <span>Create new playlist</span>
          </button>
        </div>
      )}
    </div>
  );
};
