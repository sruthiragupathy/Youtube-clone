import { useVideoList } from "../Context/VideoLibraryContext";
import { VideoCard } from "./VideoCard";
import "./VideoListing.css"


export const VideoListing = () => {
    const {videoLibrary} = useVideoList();
    return (
        <div className = "videoListing-grid">
        {videoLibrary.videoList.map(video => {
            return <VideoCard video = {video}/>
        })}
        </div>
        
    )
}