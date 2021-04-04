import {useEffect} from "react";
import './App.css';
import { RestApiCalls } from './RestApiCalls';
import { useVideoList } from "./Context/VideoLibraryContext";
import { VideoListing } from "./VideoListing/VideoListing";
import { TopNavBar } from "./Navbar/TopNavBar.jsx";
import { SideBar } from "./Navbar/SideBar";
import {Switch,Route} from "react-router-dom";
import { useMyPlaylist } from "./Context/MyPlaylistContext";


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
      <SideBar/>
      {videoLibrary.videoList.length === 0 && <p>Data not loaded yet</p>}
      <Switch>
        <Route path = "/" component = {VideoListing}/>
      </Switch>
      
      
    </div>
  );
}

export default App;
