import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { NoteState } from './context/NoteContext';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState({})
  const showAlert = (message, category) => {
    setAlert({ message, category });
    document.getElementById('alert').style.visibility = "visible";
    setTimeout(() => {
      document.getElementById('alert').style.visibility = "hidden";
    }, 2000)
  }
  return (
    <BrowserRouter>
      <NoteState>
        <Navbar/>
        <div id='alert' style={{"visibility":"false"}}>
          <Alert message={alert.message} category={alert.category} />
        </div>
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} />} />
          <Route path='/about' element={<About />} />
          <Route path='/login'  element={<Login showAlert={showAlert} />} />
          <Route path='/signup' element={<SignUp showAlert={showAlert} />} />
        </Routes>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
