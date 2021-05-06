import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import setupMockServer from './api/mock.server';
import { VideoLibraryProvider } from "./Context/VideoLibraryContext";
import { MyPlayListProvider } from "./Context/MyPlaylistContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
// setupMockServer()
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
