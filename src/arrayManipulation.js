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

export const addVideoToACategory = (library, categoryName, video) => {
    return library.map(category => {
        if(category.name === categoryName){
            return {...category, videoList:[video,...category.videoList]}
        }
        return category
    })
}

export const removeVideoFromACategory = (library,category,videoId) => {
    return library.map( item => {
        if(item.name === category){
            // item.videoList = item.videoList.filter(video => video.id === videoId)
            return {...item, videoList:item.videoList.filter(video => video.id !== videoId)}
        }
        return item;
    })
}