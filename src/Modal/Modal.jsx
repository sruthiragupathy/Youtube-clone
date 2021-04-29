import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useState } from "react";

import "./Modal.css";
import { useVideoList } from "../Context/VideoLibraryContext";

export const Modal = ({ video }) => {
  console.log("in modal");
  const { myPlaylist, myPlaylistDispatch } = useMyPlaylist();
  const { videoLibraryDispatch } = useVideoList();
  const [openForm, setOpenForm] = useState(false);
  const [newLibrary, setNewLibrary] = useState("");
  const [error, setError] = useState("");
  console.log({ video });
  const createNewPlaylistHandler = (e) => {
    e.preventDefault();
    setOpenForm(true);
  };
  const closeHandler = (e) => {
    e.preventDefault();
    videoLibraryDispatch({ type: "SET_SHOW_MODAL", payload: "" });
    myPlaylistDispatch({ type: "SET_ALL_CHECKED_TO_FALSE" });
  };
  const checkboxHandler = (e, library, video) => {
    // e.preventDefault();
    e.stopPropagation();
    myPlaylistDispatch({ type: "TOGGLE_CHECKED", payload: library });
    myPlaylistDispatch({
      type: "ADD_TO_LIBRARY",
      payload: library,
      value: video,
    });
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setError("");
    setNewLibrary(e.target.value);
  };

  const createNewLibraryHandler = (e) => {
    e.preventDefault();
    if (newLibrary) {
      myPlaylistDispatch({
        type: "ADD_NEW_LIBRARY_TO_PLAYLIST",
        payload: newLibrary,
        value: video,
      });
      videoLibraryDispatch({ type: "SET_SHOW_MODAL", payload: "" });
      setNewLibrary("");
    } else {
      setError("*input field is empty");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newLibrary) {
      createNewLibraryHandler();
    }
  };
  return (
    <div className="modal">
      <div className="save flex">
        <div>Save to...</div>
        <button className="close-btn" onClick={closeHandler}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="library-list">
        <div className="library">
          <input type="checkbox" className="checkbox" />
          <label htmlFor="watch_later">Watch later</label>
        </div>
        {myPlaylist.myLibrary.map((library) => {
          return (
            <div className="library" key={video._id}>
              <input
                type="checkbox"
                checked={library.checked}
                className="checkbox"
                name={library.name}
                onChange={(e) => checkboxHandler(e, library, video)}
              />
              <label htmlFor={library}>{library.name}</label>
            </div>
          );
        })}
      </div>

      {openForm ? (
        <div className="new_playlist">
          <input
            placeholder="Enter Playlist Name"
            className="new-playlist__input"
            value={newLibrary}
            onChange={inputChangeHandler}
            onKeyPress={handleKeyPress}
          />
          {error && <div className="error">{error}</div>}
          <div className="create-btn-container">
            <button
              className="form__create-btn"
              onClick={createNewLibraryHandler}
            >
              CREATE
            </button>
          </div>
        </div>
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
