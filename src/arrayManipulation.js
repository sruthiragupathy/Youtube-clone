import { v4 as uuidv4 } from 'uuid';

export const addNewItemToExistingArray = (array,itemToAdd) => {
    if(!array.find(item => item.id === itemToAdd.id))
    {
        return [itemToAdd,...array];
    }
    return array;
}

export const removeExistingItemFromArray = (array,video) => {
    return array.filter(item => item.id!==video.id);
}

export const toggleCheckBox = (array,object) => {
    return array.map(item => {
        if(item.id === object.id){
            return {...object,checked:!item.checked}
        }
        return item;
    })

}

const videoAlreadyExists = (libraryObject,video) =>{
    const videoIds = libraryObject.videoList.map(item => item.id);
    return videoIds.includes(video.id);
}

export const addNewCategoryToLibrary = (array,library,video) => {
    const itemInMyLibrary = array.find(item => item.name === library.name)
    if(itemInMyLibrary && itemInMyLibrary.checked && !videoAlreadyExists(itemInMyLibrary,video)){
        return array.map(item => {
            if(item.id === library.id){
                return {...item,videoList:[...item.videoList,video]}
            }
                return item;
        })
    }
    else if(itemInMyLibrary && !itemInMyLibrary.checked){
        return array.map(item => {
            if(item.id === library.id){
                return {...item,videoList:item.videoList.filter(item => item.id!==video.id)}
            }
            return item;
        })
    }
    return array;
    
} 

export const addVideoToACategory = (library, currentLibrary) => {
    return library.map(lib => {
        if(lib._id === currentLibrary._id){
            return currentLibrary
        }
        return lib;
    })
}

export const removeVideoFromACategory = (library,category,videoId) => {

    return library.map( item => {
        if(item.name === category){
            return {...item, videoList:item.videoList.filter(video => video.id !== videoId)}
        }
        return item;
    })
}

export const formatTime = (time) => {
    let timeString = ""
    let quotient = Math.floor(time/3600)
    let remainder = Math.floor(time%3600)
    
    if(quotient!== 0){
        if(quotient<9){
            timeString+=`0${quotient}:`
        }
        else{
            timeString+=`${quotient}:`
        }
    }
    quotient = Math.floor(remainder/60);
    remainder = Math.floor(remainder % 60);
    if(quotient<9){
        timeString+=`0${quotient}:`
    }
    else{
        timeString+=`${quotient}:`

    }
    if(remainder < 9){
        timeString+=`0${remainder}`
    }
    else{
        timeString+=`${remainder}`

    }
    return timeString;
}

export const addNoteToVideo = (videoList, videoId, note) => {
    return videoList.map(video => {
            if(video.id === videoId){
                return {...video, notes:[...video.notes, {id: uuidv4(), note: note.note, time: formatTime(note.time)}]}
            }
            return video
        })
}


export const removeNoteFromVideo = (videoList, videoId, noteId) => {
    return videoList.map(video => {
        if(video.id === videoId) {
            return {...video, notes:video.notes.filter( note => note.id !== noteId )}
        }
        return video;
    })
}


export const editNoteInVideo = (videoList, videoId, noteId, editNote) => {
    return videoList.map(video => {
        if(video.id === videoId) {
            return {...video, notes: video.notes.map(note => {
                if(note.id === noteId){
                    return {...note, note: editNote }
                }
                return note
            })}
        }
        return video;
    })
}
