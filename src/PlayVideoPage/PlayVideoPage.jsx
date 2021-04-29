import {  useRef } from "react";
import { useParams } from "react-router"
// import {videoLibrary} from "../database";
import { VideoContainer } from "./VideoContainer";
import "./PlayVideoPage.css";
import { Notes } from "./Notes";
import { useVideoList } from "../Context/VideoLibraryContext";
export const PlayVideoPage = () => {
    const {videoId} = useParams();
    const { videoLibrary } = useVideoList();
    const getVideoById = (videoId) => {
        return videoLibrary.videoList.find( video => video._id === videoId);
    }

    const videoPlayerRef = useRef()

    const video = getVideoById(videoId);

    return(
        <div className = "main-video-page">
            <VideoContainer video = {video} videoPlayerRef = {videoPlayerRef} />
            <Notes video = {video} videoPlayerRef = {videoPlayerRef}/>
        </div>
    )
}