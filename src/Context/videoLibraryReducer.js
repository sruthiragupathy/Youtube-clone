export const videoLibraryReducer = (videoLibrary,{type,payload}) => {
    switch(type){
        case "LOAD_VIDEOLIST":
            return {...videoLibrary,videoList:payload}  
        default:
            return videoLibrary;
    }
}