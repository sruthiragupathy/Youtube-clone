import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import { SideBar } from "../Navbar/SideBar";
import "./WatchLater.css";

export const WatchLater = () => {
  const { myPlaylist } = useMyPlaylist();
  return (
    <>
      <SideBar />
      <div className="flex-center margin-left-4">
        {myPlaylist.watchLaterList.length === 0 ? (
          <div className="no-videos">"No videos to show"</div>
        ) : (
          <div className="stacked-list">
            <div className="heading">Watch Later</div>

            {myPlaylist.watchLaterList.map((video) => {
              return <HorizontalCard key={video.id} video={video} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};
