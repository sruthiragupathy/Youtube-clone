import {useParams} from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import {Link} from "react-router-dom";
import { SideBar } from "../Navbar/SideBar";

export const StackedListTemplate = () => {
    const {libraryName}= useParams();
    const {myPlaylist,myPlaylistDispatch} = useMyPlaylist();
    const getCurrentLibraryObject = (libraryName) => {
        
        return myPlaylist.myLibrary.find( library => library.name === libraryName)
    }
    return (
        <>
        <SideBar/>
        <div className = "flex-center margin-left-4">
            {
                    <div className = "stacked-list">
                    <div className = "back_link">
                    <Link to = "/library" >{`> Back to My Library`}</Link>

                    </div>
                    <div className = "heading">{`${libraryName}`}</div>

                    {
                       getCurrentLibraryObject(libraryName).videoList.map(video => {
                            return (
                                <Link to = {`/video/${video.id}`}>
                                <HorizontalCard key = {video.id} video = {video} libraryName = {libraryName}/>
                                </Link>
                            )
                        })
                    }
                    </div>
                
            }
        </div>
        </>
    )
}