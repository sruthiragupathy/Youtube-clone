import { useMyPlaylist } from "../Context/MyPlaylistContext"
import { LibraryCard } from "./LibraryCard"
import "../Watch Later/WatchLater"


export const Library = () => {
    const {myPlaylist} = useMyPlaylist();
    return <div className = "stacked-list flex-center">
                    <div className = "heading">My Library</div>

                    {
                        myPlaylist.myLibrary.map(library => {
                            console.log(library["videoList"].length)
                            return (
                                library["videoList"].length ? <LibraryCard key = {library.id} library = {library} /> : null
                            )
                        })
                    }
                    </div>
                
    
}