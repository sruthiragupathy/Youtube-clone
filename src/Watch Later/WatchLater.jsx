import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import { SideBar } from "../Navbar/SideBar";
import { BACKEND } from "../utils/api";


import "./WatchLater.css";


export const WatchLater = () => {
  const { myPlaylist } = useMyPlaylist();
  const {watchLaterId} = useParams()
  const [watchLaterVideos, setWatchLaterVideos] = useState([])

  // useEffect(()=> {
  //   (async function () {
  //     const  response  = await axios.get(`${BACKEND}/playlist/${watchLaterId}`)
  //     console.log(response);
  //     setWatchLaterVideos(response.data.response)
  // })()
  //   },[])
  //   const deleteFromPlaylist = async (e) => {
  //     e.preventDefault();
  //     console.log("delete")
  //     const response = await axios.delete(`${BACKEND}/playlist/${watchLaterId}/${video._id}`)
  //    console.log({response})
  //    myPlaylistDispatch({type: "ADD_VIDEO_TO_LIBRARY", payload: response.data.response})
  // }
  const getWatchLaterVideos = () => {
    // console.log(myPlaylist.myLibrary.find(library => library._id === watchLaterId).videos)
    return myPlaylist?.myLibrary?.find(library => library._id === watchLaterId)?.videos
  }
  return (
    <>
      <SideBar />
      <div className="flex-center margin-left-4">
        {!getWatchLaterVideos()?.length ?  (
          <div className="no-videos">"No videos to show"</div>
        ) : (
          <div className="stacked-list">
            <div className="heading">Watch Later</div>

            {getWatchLaterVideos().map((video) => {
              return  <Link to = {`/video/${video._id}`}>
              <HorizontalCard key={video._id} video={video.video} libraryId = {watchLaterId}/>;
              </Link>
            })}
          </div>
        )} 
      </div>
    </>
  );
};
