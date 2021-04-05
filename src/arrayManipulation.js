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

export const addNewItemToLibrary = (array,library,video) => {

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