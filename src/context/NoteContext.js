import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState=(props)=>{
    let [notes,setNotes] = useState([])

    const addNote=async (title,description,tag)=>{
        const respone = await fetch("http://localhost:5000/api/notes/add", {
            method: 'POST', // 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            
            body: JSON.stringify({
                "title":title,
                "description":description,
                "tag":tag
            }) // body data type must match "Content-Type" header
            
          });
          let data = await respone.json()
          data = notes.concat({nid:data.insertId,title,description,tag})
          setNotes(data)

    }
    
    const deleteNote= async (nid)=>{
        await fetch("http://localhost:5000/api/notes/delete", {
            method: 'POST', // 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({"nid":nid}) // body data type must match "Content-Type" header
          });
          let data = notes.filter((note)=>{
            return note.nid!==nid
          })
          setNotes(data)
    }
    
    const updateNote= async (nid,title,description,tag)=>{
        await fetch("http://localhost:5000/api/notes/update", {
            method: 'POST', // 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                "nid":nid,
                "title":title,
                "description":description,
                "tag":tag
            }) // body data type must match "Content-Type" header
          });
          let notes2=notes.filter((element)=>{
            return element.nid !== nid
          })
          
          setNotes(notes2.concat({nid,title,description,tag}))
          
    }
    const readNote=async ()=>{
        const response = await fetch("http://localhost:5000/api/notes/read", {
            method: 'GET', // 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            // body: JSON.stringify() // body data type must match "Content-Type" header
          });
        let data = await response.json()
        setNotes(data); // parses JSON response into native JavaScript objects  
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,updateNote,readNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteContext
export {NoteState}

  