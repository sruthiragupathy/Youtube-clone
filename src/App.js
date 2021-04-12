import {useEffect} from "react";
import './App.css';
import { RestApiCalls } from './RestApiCalls';
import { useVideoList } from "./Context/VideoLibraryContext";
import { VideoListing } from "./VideoListing/VideoListing";
import { TopNavBar } from "./Navbar/TopNavBar.jsx";
import { SideBar } from "./Navbar/SideBar";
import {Switch,Route} from "react-router-dom";
import { useMyPlaylist } from "./Context/MyPlaylistContext";
import { WatchLater } from "./Watch Later/WatchLater";
import { Library } from "./Library/Library";
import { StackedListTemplate } from "./StackedListTemplate/StackedListTemplate";
import { PlayVideoPage } from "./PlayVideoPage/PlayVideoPage";



function App() {
  const {videoLibrary,videoLibraryDispatch} = useVideoList();
  const {myPlaylist,myPlaylistDispatch} = useMyPlaylist();

  useEffect(()=>{
    (async function(){
      const response = await RestApiCalls("GET","/api/videos")
      videoLibraryDispatch({type:"LOAD_VIDEOLIST",payload:response.data})
    })()

    console.log({videoLibrary});

  },[])
  console.log({myPlaylist})
  return (
    <div className={`App`}>
      {videoLibrary.showModal && <div className = "background-overlay"></div>}
      <TopNavBar/>
      {videoLibrary.videoList.length === 0 && <p>Data not loaded yet</p>}
      <Switch>
        <Route path = "/" exact component = {VideoListing}/>
        <Route path = "/watchlater" component = {WatchLater}/>
        <Route path = "/library/:libraryName" component = {StackedListTemplate}/>
        <Route path = "/library" component = {Library}/>
        <Route path = "/video/:videoId" component = {PlayVideoPage} />
      </Switch>
      
      
    </div>
  );
}

export default App;
