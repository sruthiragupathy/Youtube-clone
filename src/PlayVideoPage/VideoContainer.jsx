import "./VideoContainer.css";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


export const VideoContainer = ({snippet, videoId}) => {
    return (
        <div className = "main-video__container">
            <div>
            <iframe 
            width="100%" 
            height="400" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
            </div>
            <div className = "main-video__description">
                <h3>{snippet.title}</h3>
                <div className = "video-description__row2 grey-txt">
                    <div className = "grey-txt">
                        <span>1,158,375 views • Dec 9, 2016</span>
                    </div>
                    <div className = "row2__icons">
                        <button className = "btn-icon">
                            <ThumbUpAltIcon fontSize = "large" className = "grey-txt"/>
                        </button>
                        <button className = "btn-icon">
                            <PlaylistAddRoundedIcon fontSize = "large" className = "grey-txt"/>
                        </button>
                        <button className = "btn-icon">
                            <BookmarkBorderIcon fontSize = "large" className = "grey-txt"/>
                        </button>
                    </div>
                </div>
                <div className = "channel-description">
                    <img src={snippet.imageURL} alt="" className = "video-card__profile-pic"/>
                    <div className = "margin-left-1">
                    <div className = "bold-txt">{snippet.channelTitle}</div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}