export const getIdsInPlaylistCategory = (libraryArray, playlistCategory) => {
  return libraryArray
    .find((library) => library.name === playlistCategory)
    ?.videos.map((video) => video._id);
};


export const isVideoInLibrary = (myPlaylist,videoId, libraryId) => {
  const currentLibrary = myPlaylist.find( library => library._id === libraryId);
  const videoIdsInCurrentLibrary = currentLibrary.videos.map(video => video._id)
  return videoIdsInCurrentLibrary.includes(videoId)
}

export const getIdOfAPlaylist = (myPlaylist, playlistCategory) => {
  return myPlaylist.find(library => library.name === playlistCategory)?._id;
}

export const getVideosOfPlaylistCategory = (myPlaylist, playlistId) => {
  return myPlaylist.find(playlist => playlist._id===playlistId)?.videos;
}

export const getVideoById = (videoList, videoId) => {
  return videoList.filter(video => video._id===videoId)

}

export const hideToast = (dispatch, seconds = 1000) => {
  setTimeout(() => {
      dispatch({type:"TOGGLE_TOAST",payload:"", value: false});
    }, seconds)
}


const privateRoutes = ["/library", "/watchlater"]

export const isAPrivateRoute = (path) => {
  const booleanArray = privateRoutes.map( route => {

    return path.search(route) > -1 ? true :false
  })

  return booleanArray.indexOf(true) > -1 ;
}