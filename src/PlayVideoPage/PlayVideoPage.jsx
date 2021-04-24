import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router"
import {videoLibrary} from "../database";
import { VideoContainer } from "./VideoContainer";
import "./PlayVideoPage.css";
import { Notes } from "./Notes";
export const PlayVideoPage = () => {
    const {videoId} = useParams();
    const getVideoById = (videoId) => {
        return videoLibrary.find( video => video.id === videoId)
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