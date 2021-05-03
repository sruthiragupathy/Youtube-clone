export const getIdsInPlaylistCategory = (libraryArray, playlistCategory) => {
  console.log({libraryArray, playlistCategory})

  return libraryArray
    .find((library) => library.name === playlistCategory)
    .videos.map((video) => video._id);
};


export const isVideoInLibrary = (myPlaylist,videoId, libraryId) => {
  const currentLibrary = myPlaylist.find( library => library._id === libraryId);
  const videoIdsInCurrentLibrary = currentLibrary.videos.map(video => video._id)
  return videoIdsInCurrentLibrary.includes(videoId)
}

export const getIdOfAPlaylist = (myPlaylist, playlistCategory) => {
  console.log(myPlaylist)
  const {_id:playlistId} = myPlaylist.find(library => library.name === playlistCategory);
  return playlistId
}

export const getVideosOfPlaylistCategory = (myPlaylist, playlistId) => {
  const {videos} = myPlaylist.find(playlist => playlist._id===playlistId);
  return videos;
}

export const getVideoById = (videoList, videoId) => {
  return videoList.filter(video => video._id===videoId)

}
