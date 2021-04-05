import { useMyPlaylist } from "../Context/MyPlaylistContext"
import { LibraryCard } from "./LibraryCard"


export const Library = () => {
    const {myPlaylist} = useMyPlaylist();
    return <div className = "margin-left-4">
                    <div className = "stacked-list flex-center">
                    <div className = "heading">My Library</div>

                    {
                        myPlaylist.myLibrary.map(library => {
                            return (
                                <LibraryCard key = {library.id} library = {library} />
                            )
                        })
                    }
                    </div>
                </div>
    
}