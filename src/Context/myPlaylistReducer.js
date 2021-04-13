import { addNewItemToExistingArray, addNewCategoryToLibrary, removeExistingItemFromArray, toggleCheckBox, removeVideoFromACategory, addVideoToACategory } from "../arrayManipulation";
import {v4 as uuidv4} from "uuid";


export const myPlaylistReducer = (myPlaylist,{type,payload,value}) => {
    switch(type){
        case "ADD_TO_WATCH_LATER":
            return {...myPlaylist,watchLaterList:addNewItemToExistingArray(myPlaylist.watchLaterList,payload)}
        case "REMOVE_FROM_WATCH_LATER":
            return {...myPlaylist,watchLaterList:removeExistingItemFromArray(myPlaylist.watchLaterList,payload)}
        case "ADD_TO_LIBRARY":
           return {...myPlaylist,myLibrary:addNewCategoryToLibrary(myPlaylist.myLibrary,payload,value)}
        case "ADD_VIDEO_TO_LIBRARY":
            return {...myPlaylist,myLibrary:addVideoToACategory(myPlaylist.myLibrary,payload,value)}
        case "REMOVE_VIDEO_FROM_LIBRARY":
            return {...myPlaylist, myLibrary:removeVideoFromACategory(myPlaylist.myLibrary,payload,value)}
        case "TOGGLE_CHECKED":
            return {...myPlaylist,myLibrary:toggleCheckBox(myPlaylist.myLibrary,payload)}
        case "SET_ALL_CHECKED_TO_FALSE":
            return {
                ...myPlaylist,myLibrary:myPlaylist.myLibrary.map(item => ({...item,checked:false}))
            }
        case "ADD_NEW_LIBRARY_TO_PLAYLIST":
            return {
                ...myPlaylist,myLibrary:[...myPlaylist.myLibrary,
                    {id:uuidv4(),name:payload,checked:false,videoList:[value]}]
            }
        default:
            return myPlaylist;
    }
}