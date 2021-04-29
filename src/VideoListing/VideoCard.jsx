// import axios from "axios";
// import { NavLink } from "react-router-dom";
import { useVideoList } from "../Context/VideoLibraryContext";
// import { Modal } from "../Modal/Modal";
import { Options } from "./Options";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  const {
    _id,
    videoId,
    title,
    channelTitle,
    channelProfile,
    viewCount,
  } = video;

  const { videoLibrary, videoLibraryDispatch } = useVideoList();

  const handleMoreOptions = (e) => {
    e.preventDefault();
    videoLibraryDispatch({ type: "SET_SHOW_OPTIONS", payload: _id });
  };

  return (
    <>
      <div className="video__card pointer">
        <div className="card__img">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            alt={title}
          />
        </div>
        <div className="video-card__description">
          <img
            src={channelProfile}
            alt=""
            className="video-card__profile-pic"
          />
          <div className="video-card__txt">
            <div className="txt__title">{title}</div>
            <div className="grey-txt channel-title">{channelTitle}</div>
            <small className="grey-txt view-count">
              {viewCount} Views · 1 day ago
            </small>
          </div>
          <button className="btn-icon br" onClick={handleMoreOptions}>
            <i className="fa fa-ellipsis-v"></i>
          </button>
          <Options
            showOptions={videoLibrary.showOptions === _id}
            video={video}
          />
        </div>
      </div>
    </>
  );
};
