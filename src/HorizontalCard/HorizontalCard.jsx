import { useMyPlaylist } from "../Context/MyPlaylistContext";
import "./HorizontalCard.css"


export const HorizontalCard = ({video}) => {
    const {snippet} = video;
    const {title,channelTitle,thumbnails} = snippet;
    const {myPlaylistDispatch} = useMyPlaylist();

    const deleteFromPlaylist = () => {
        console.log("delete")
    }
    return (
        
        <div className = "list relative">
            <div className = "list__img">
                <img src = {thumbnails.default.url} alt = {title}/>
            </div>
            <div className = "list__details">
                <div className = "details__title">{title}</div>
                <div className = "details__channeltitle">{channelTitle}</div>
            </div>
            {/* <button className = "btn-options br" onClick = {moreOptionHandler}>
                <i className = "fa fa-ellipsis-v"></i>
            </button>
            

            <div className = "horizontal-card__option">
                <button className = "btn-transparent">Remove from playlist</button>
            </div> */}
            <button class = "btn-icon br trash" onClick = {deleteFromPlaylist}>
                <i class="fa fa-trash-o fa-2x"></i>
            </button>
        </div>
        
        
    )
}