export const getIdsInPlaylistCategory = (libraryArray, playlistCategory) => {
  return libraryArray
    .find((library) => library.name === playlistCategory)
    .videoList.map((video) => video._id);
};
