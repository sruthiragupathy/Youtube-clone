import { useMyPlaylist } from "../Context/MyPlaylistContext"
import { LibraryCard } from "./LibraryCard"
import "../Watch Later/WatchLater"
import { SideBar } from "../Navbar/SideBar";


export const Library = () => {
    const {myPlaylist} = useMyPlaylist();
    return  <>
    <SideBar/>
    <div className = "flex-center margin-left-4">
        <div className = "stacked-list">
            
                    
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
                    </div>
        </>
                
    
}