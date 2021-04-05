import { addNewItemToExistingArray, addNewItemToLibrary, removeExistingItemFromArray, toggleCheckBox } from "../arrayManipulation";
import {v4 as uuidv4} from "uuid";


export const myPlaylistReducer = (myPlaylist,{type,payload,value}) => {
    switch(type){
        case "ADD_TO_WATCH_LATER":
            return {...myPlaylist,watchLaterList:addNewItemToExistingArray(myPlaylist.watchLaterList,payload)}
        case "REMOVE_FROM_WATCH_LATER":
            return {...myPlaylist,watchLaterList:removeExistingItemFromArray(myPlaylist.watchLaterList,payload)}
        case "ADD_TO_LIBRARY":
           return {...myPlaylist,myLibrary:addNewItemToLibrary(myPlaylist.myLibrary,payload,value)}
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