import {useParams} from "react-router-dom";
import { useMyPlaylist } from "../Context/MyPlaylistContext";
import { HorizontalCard } from "../HorizontalCard/HorizontalCard";
import {Link} from "react-router-dom";
import { SideBar } from "../Navbar/SideBar";
import { getVideosOfPlaylistCategory } from "../utils/utils";

export const StackedListTemplate = () => {
    const {libraryName, libraryId}= useParams();
    const {myPlaylist,myPlaylistDispatch} = useMyPlaylist();
    // const getCurrentLibraryObject = (libraryName) => {
        
    //     return myPlaylist.myLibrary.find( library => library.name === libraryName)
    // }
    console.log(getVideosOfPlaylistCategory(myPlaylist.myLibrary, libraryId))
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
                       getVideosOfPlaylistCategory(myPlaylist.myLibrary, libraryId).map(video => {
                            return (
                                <Link to = {`/video/${video._id}`}>
                                <HorizontalCard key = {video._id} video = {video.video} libraryName = {libraryName} libraryId = {libraryId}/>
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