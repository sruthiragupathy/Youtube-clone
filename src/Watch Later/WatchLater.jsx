import { useMyPlaylist } from "../Context/MyPlaylistContext"
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import "./WatchLater.css"

export const WatchLater = () => {
    const {myPlaylist,myPlaylistDispatch} = useMyPlaylist();
    return (
        <div>
            {
                myPlaylist.watchLaterList.length === 0 ? 
                <div className = "no-videos">
                    "No videos to show"
                </div> : 
                
                    <div className = "stacked-list flex-center">
                    <div className = "heading">Watch Later</div>

                    {
                        myPlaylist.watchLaterList.map(video => {
                            return (
                                <HorizontalCard key = {video.id} video = {video} />
                            )
                        })
                    }
                    </div>
                
            }
        </div>
    )
}