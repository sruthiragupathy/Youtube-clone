export const LibraryCard = ({library}) => {
    const {id,name,videoList} = library;

    // const deleteFromPlaylist = () => {
    //     myPlaylistDispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video})
    // }
    return (
        
        <div className = "list relative">
            <div className = "list__img">
                <img src = {videoList[0].snippet.thumbnails.default.url} alt = {name}/>
            </div>
            <div className = "list__details">
                <div className = "details__title">{name}</div>
                <div className = "details__channeltitle">{videoList.length === 1 ? "1 video" : `${videoList.length} videos`}</div>
            </div>
            {/* <button className = "btn-options br" onClick = {moreOptionHandler}>
                <i className = "fa fa-ellipsis-v"></i>
            </button>
            

            <div className = "horizontal-card__option">
                <button className = "btn-transparent">Remove from playlist</button>
            </div> */}
            <button class = "btn-icon br trash" >
                <i class="fa fa-trash-o fa-2x"></i>
            </button>
        </div>
        
        
    )
}