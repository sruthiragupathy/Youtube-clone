import "./HorizontalCard.css"

export const HorizontalCard = ({video}) => {
    const {snippet} = video;
    const {title,channelTitle,thumbnails} = snippet;
    return (
        <div className = "list">
            <div className = "list__img">
                <img src = {thumbnails.default.url} alt = {title}/>
            </div>
            <div className = "list__details">
                <div className = "details__title">{title}</div>
                <div className = "details__channeltitle">{channelTitle}</div>
            </div>
            <button className = "btn-options br">
                <i className = "fa fa-ellipsis-v"></i>
            </button>
        </div>
    )
}