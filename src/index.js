import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { VideoLibraryProvider } from "./Context/VideoLibraryContext";
import { MyPlayListProvider } from "./Context/MyPlaylistContext";
import { HashRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <VideoLibraryProvider>
        <MyPlayListProvider>
          <App />
        </MyPlayListProvider>
      </VideoLibraryProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
