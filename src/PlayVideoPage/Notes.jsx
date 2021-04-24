import "./Notes.css"
import {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import { useVideoList } from "../Context/VideoLibraryContext";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
export const Notes = ({video, videoPlayerRef}) => {
    const {videoLibrary,videoLibraryDispatch} = useVideoList()
    console.log({videoLibrary});
    const [note, setNote] = useState("")
    const onChangeHandler = (e) => {
        setNote(e.target.value)
    }

    const addNoteHandler = () => {
        setNote(() => "");
        videoLibraryDispatch({ type: "ADD_NOTE", payload: video.id, value: {note: note, time: videoPlayerRef.current.getCurrentTime()}})

    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter" && note) {
            addNoteHandler()
        }
    }

    const getNotes = (videoId) => {
        console.log(videoId)
        // console.log(videoLibrary.videoList.find(item => item.id === videoId))
        return videoLibrary.videoList.find(item => item.id === videoId).notes
    }
    return <div className = "form-container">
        <h4>Take Notes</h4>
        <div className="input-container">
	        <input 
            type="text" 
            className = "take-note"
            name = "note"
            value = {note}
            placeholder = "Take A Note"
            onChange = { onChangeHandler }
            onKeyPress = { handleKeyPress }
            />
            <button className = "add-note-btn" onClick = {addNoteHandler}>
                <AddIcon />
            </button>
        </div>
        {
            videoLibrary.videoList.length!==0 && (getNotes(video.id).length?
            getNotes(video.id).map( note => {
                return <div className = "note">
                <div className = "flex1">
                    <span>{note.note}</span>
                    <span className = "small-txt"><i className = "fa fa-clock-o"></i> {note.time}</span>
                </div>
                 <div className = "flex-center">
                 <button className = "btn-transparent edit">
                    <EditIcon />
                </button>
                <button className = "btn-transparent delete-note">
                    <DeleteIcon  />
                </button>
                </div>
                </div>
            })
             :
            null) 

        }

    </div>
}