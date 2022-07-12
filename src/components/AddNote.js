import React, { useState,useContext } from 'react'
import NoteContext from '../context/NoteContext'

function AddNote(props) {
    const context = useContext(NoteContext)
    const {addNote} = context
    const [note,setNote] = useState({title:"",description:"",tag:""})
    
    const handleOnChange=()=>{
        setNote({
            title : document.getElementsByName('title')[0].value,
            description : document.getElementsByName('description')[0].value,
            tag : document.getElementsByName('tag')[0].value
        })
    
    }

    const handleAddNote=(event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        document.getElementsByName('title')[0].value=""
        document.getElementsByName('description')[0].value=""
        document.getElementsByName('tag')[0].value=""
        props.showAlert("Note added successfully","success")
    }
    return (
        <div className="container">
            <h2>Add Your Note Here</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' aria-describedby="emailHelp" onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">Tag</label>
                    <input type="text" className="form-control" name='tag' aria-describedby="emailHelp" onChange={handleOnChange}/>
                </div>
                <button className="btn btn-success" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
