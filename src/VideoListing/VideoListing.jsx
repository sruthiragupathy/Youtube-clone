import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Modal } from "../Modal/Modal";
import { SideBar } from "../Navbar/SideBar";
import { VideoCard } from "./VideoCard";
import { Link, useLocation } from "react-router-dom";
import "./VideoListing.css";
import { BottomNavBar } from "../Navbar/BottomNavBar";
import { Category } from "./Category";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const VideoListing = () => {
  const { videoLibrary } = useVideoList();
  const { myPlaylist } = useMyPlaylist();
  const query = useQuery();
  const category = query.get('category')
  const filterVideosByCategory = (videoList) => {

      return category ? videoList.filter(video => video.category.name === category) : videoList

  }
  return (
    <>
      <SideBar />
      <BottomNavBar/>
      <div className = "category-container">
      <Category />
      </div>
      <div className="videoListing-grid">
        {filterVideosByCategory(videoLibrary.videoList).map((video) => {
          return (
            <div key={video._id}>
              <Link to={`/video/${video._id}`}>
                <VideoCard video={video} onClick={() => console.log("hi")} />
              </Link>
              {videoLibrary.showModal === video._id && (
                <Modal video={video} key={video._id} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
