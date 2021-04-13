import { useEffect } from "react";
import { useParams } from "react-router"
import {videoLibrary} from "../database";
import { VideoContainer } from "./VideoContainer";
import "./PlayVideoPage.css";
export const PlayVideoPage = () => {
    const {videoId} = useParams();
    const getVideoById = (videoId) => {
        return videoLibrary.find( video => video.id === videoId)
    }

    const video = getVideoById(videoId);
    return(
        <div className = "main-video-page">
            <VideoContainer video = {video} />
        </div>
    )
}