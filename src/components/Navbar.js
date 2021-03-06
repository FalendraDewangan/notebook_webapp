import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

function Navbar() {
    let location=useLocation();
    const handleLogout= ()=>{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token')
        }
        window.location.href="/"
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
                          
                        </ul>
                        {!localStorage.getItem('token') ? <div className="d-flex mx-4">
                        <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-success mx-2" to="/signup" role="button">Sign Up</Link>
                        </div>:<Link className="btn btn-success mx-2" onClick={handleLogout} to="/signup" role="button">Logout</Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
