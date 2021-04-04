import axios from "axios";
import { useVideoList } from "../Context/VideoLibraryContext";
import { Modal } from "../Modal/Modal";
import { Options } from "./Options";
import "./VideoCard.css";

export const VideoCard = ({video}) => {
    const {id,snippet} = video;
    const {publishedAt,channelId,title,description,thumbnails,channelTitle,publishTime,imageURL} = snippet;
    const {videoLibrary,videoLibraryDispatch} = useVideoList();
    const getTrimmedTitle = (title) => {
        if(title.length > 40){
            return `${title.slice(0,45)}...`
        }
        return title;
    }

    const handleMoreOptions = () => {
        videoLibraryDispatch({type:"SET_SHOW_OPTIONS",payload:id})
    }
   
    return <>
    <div className = "video__card">
        <div className = "card__img">
            <img src = {thumbnails.medium.url} alt ={title}/>
        </div>
        <div className = "video-card__description">
            <img src={imageURL} alt="" className = "video-card__profile-pic"/>
            <div className = "video-card__txt">
                <div className = "txt__title">{getTrimmedTitle(title)}</div>
                <div className = "grey-txt">{channelTitle} <i className = "fa fa-check-circle"></i></div>
                <small className = "grey-txt">2.4M Views · 1 day ago</small>
            </div>
            <button className = "btn-icon br trash" onClick = {handleMoreOptions}>
                <i className = "fa fa-ellipsis-v"></i>
            </button>
            <Options showOptions = {videoLibrary.showOptions === id} video = {video}/>
        </div>
       
        </div>
        {videoLibrary.showModal === id && <Modal video = {video}/>}
    </>

}