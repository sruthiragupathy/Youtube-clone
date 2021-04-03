import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import setupMockServer from './api/mock.server';
import { VideoLibraryProvider } from './Context/VideoLibraryContext';
setupMockServer()
ReactDOM.render(
  <React.StrictMode>
    <VideoLibraryProvider>
    <App />
    </VideoLibraryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


