export const videoLibraryReducer = (videoLibrary,{type,payload}) => {
    switch(type){
        case "LOAD_VIDEOLIST":
            return {...videoLibrary,videoList:payload} 
        case "SET_SHOW_OPTIONS":
            return {...videoLibrary,showOptions:payload} 
            case "SET_SHOW_MODAL":
                return {...videoLibrary,showModal:payload} 
        case "SET_OVERLAY":
            return {...videoLibrary,overlay:!videoLibrary.overlay}
        default:
            return videoLibrary;
    }
}