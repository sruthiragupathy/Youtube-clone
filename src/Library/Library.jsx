import { useMyPlaylist } from "../Context/MyPlaylistContext"
import { LibraryCard } from "./LibraryCard"
import "../Watch Later/WatchLater"
import { SideBar } from "../Navbar/SideBar";
import { BottomNavBar } from "../Navbar/BottomNavBar";


export const Library = () => {
    const {myPlaylist} = useMyPlaylist();
    return  <>
    <SideBar/>
    <BottomNavBar/>
    <div className = "flex-center margin-left-4">
        <div className = "stacked-list">
            
                    
                    <div className = "heading">My Library</div>

                    {
                        myPlaylist?.myLibrary?.map(library => {
                            return (
                                <LibraryCard key = {library._id} library = {library} /> 
                            )
                        })
                    }
                    </div>
                    </div>
        </>
        }