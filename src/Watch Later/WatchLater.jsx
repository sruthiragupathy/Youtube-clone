
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import { BottomNavBar } from "../Navbar/BottomNavBar";
import { SideBar } from "../Navbar/SideBar";


import "./WatchLater.css";


export const WatchLater = () => {
  const { myPlaylist } = useMyPlaylist();
  const {watchLaterId} = useParams()
  
  const getWatchLaterVideos = () => {
    return myPlaylist?.myLibrary?.find(library => library._id === watchLaterId)?.videos
  }
  return (
    <>
      <SideBar />
      <BottomNavBar />
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
