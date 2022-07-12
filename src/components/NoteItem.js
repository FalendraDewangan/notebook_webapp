import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

function NoteItem(props) {
    const { deleteNote } = useContext(NoteContext)

    const handleDelete = () => {
        deleteNote(props.nid);
        props.showAlert("Note deleted successfully")
    }
    return (
        <>
            


            <div className="card">
                <div className="card-body">
                    <div className="d-flex ">
                        <h5 className="card-title">{props.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
                            props.toggle(props.nid,props.title,props.description,props.tag)
                        }}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                    </div>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default NoteItem
