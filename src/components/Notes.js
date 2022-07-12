import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem'

function Notes(props) {
  let { notes, readNote, updateNote } = useContext(NoteContext)
  useEffect(() => {
    if (localStorage.getItem('token'))
      readNote();
    else {
      window.location.href = "/login"
    }
    // eslint-disable-next-line
  }, [])
  let Unid
  const toggle = (nid, title, description, tag) => {
    document.getElementById('modalButton').click()
    Unid = nid
    document.getElementsByName('title')[1].value = title
    document.getElementsByName('description')[1].value = description
    document.getElementsByName('tag')[1].value = tag
  }
  const handleUpdate = () => {
    let title = document.getElementsByName('title')[1].value
    let description = document.getElementsByName('description')[1].value
    let tag = document.getElementsByName('tag')[1].value
    updateNote(Unid, title, description, tag)
    document.getElementById('close').click();
    props.showAlert("Note updated sucessfully","success")
  }

  return (
    <>
      <button type="button" className="btn btn-primary d-none" id='modalButton' data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor='title' className="form-label">Title</label>
                  <input type="text" className="form-control" name='title' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" name='description' />
                </div>
                <div className="mb-3">
                  <label htmlFor='tag' className="form-label">Tag</label>
                  <input type="text" className="form-control" name='tag' aria-describedby="emailHelp" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id='close' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {
            notes.map((note) => {
              return <div className="col-md-3 my-3" key={note.nid}>
                <NoteItem title={note.title} showAlert={props.showAlert} description={note.description} nid={note.nid} tag={note.tag} toggle={toggle} />
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Notes
