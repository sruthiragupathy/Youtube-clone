import {  useRef, useState, useEffect } from "react";
import { useParams } from "react-router"
// import {videoLibrary} from "../database";
import { VideoContainer } from "./VideoContainer";
import "./PlayVideoPage.css";
import { Notes } from "./Notes";
// import { useVideoList } from "../Context/VideoLibraryContext";
import axios from "axios";
import { BACKEND } from "../utils/api";
import CircularProgress from '@material-ui/core/CircularProgress';


export const PlayVideoPage = () => {
    const {videoId} = useParams();
    // const { videoLibrary } = useVideoList();
    const [video, setVideo] = useState()
    // const getVideoById = (videoId) => {
    //     return videoLibrary.videoList.find( video => video._id === videoId);
    // }

    const videoPlayerRef = useRef()

    useEffect(() => {
        // console.log("from useeffect")
        (async function() {
            try{
            const  response = await axios.get(`${BACKEND}/video/${videoId}`) ;
            // if(response.status === 200) {
                console.log(response);
              setVideo(response.data.response)
             }
             catch(error){
                 console.log(error.message)
             }
          })()
    }, [])

    return(
        video ? 
        <div className = "main-video-page">
            <VideoContainer video = {video} videoPlayerRef = {videoPlayerRef} />
            <Notes video = {video} videoPlayerRef = {videoPlayerRef}/>
        </div> : 
        <div className = "loader">
        	<CircularProgress color = "primary"/>
      	</div> 
    )
}