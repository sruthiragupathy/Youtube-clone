import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Modal } from "../Modal/Modal";
import { VideoCard } from "./VideoCard";
import "./VideoListing.css"


export const VideoListing = () => {
    const {videoLibrary} = useVideoList();
    const {myPlaylist} = useMyPlaylist();
    console.log(myPlaylist);
    return (
        <>
        <div className = "videoListing-grid">
        {videoLibrary.videoList.map(video => {
            return <VideoCard video = {video}/>
        })}
        </div>
        </>
        
    )
}