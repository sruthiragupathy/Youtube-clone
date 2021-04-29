import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import setupMockServer from './api/mock.server';
import { VideoLibraryProvider } from "./Context/VideoLibraryContext";
import { MyPlayListProvider } from "./Context/MyPlaylistContext";
import { BrowserRouter as Router } from "react-router-dom";
// setupMockServer()
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoLibraryProvider>
        <MyPlayListProvider>
          <App />
        </MyPlayListProvider>
      </VideoLibraryProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
