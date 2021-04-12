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

    const {snippet} = getVideoById(videoId);
    return(
        <div className = "main-video-page">
            <VideoContainer snippet = {snippet} videoId = {videoId} />
        </div>
    )
}