import {useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { RestApiCalls } from './RestApiCalls';
import { useVideoList } from "./Context/VideoLibraryContext";
import { VideoListing } from "./VideoListing/VideoListing";


function App() {
  const {videoLibrary,videoLibraryDispatch} = useVideoList();

  useEffect(()=>{
    (async function(){
      const response = await RestApiCalls("GET","/api/videos")
      videoLibraryDispatch({type:"LOAD_VIDEOLIST",payload:response.data})
    })()

    console.log({videoLibrary});

  },[])
  return (
    <div className="App">
      {videoLibrary.videoList.length === 0 && <p>Data not loaded yet</p>}
      <VideoListing/>
      
    </div>
  );
}

export default App;
