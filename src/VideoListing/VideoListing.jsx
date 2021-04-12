import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Modal } from "../Modal/Modal";
import { SideBar } from "../Navbar/SideBar";
import { VideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import "./VideoListing.css"


export const VideoListing = () => {
    const {videoLibrary} = useVideoList();
    const {myPlaylist} = useMyPlaylist();
    console.log(myPlaylist);
    return (
        <>
        <SideBar/>
        <div className = "videoListing-grid">
        {videoLibrary.videoList.map(video => {
            return <Link to = {`/video/${video.id}`}>
                <VideoCard video = {video} onClick = {() => console.log("hi")} />
            </Link>
        })}
        </div>
        </>
        
    )
}