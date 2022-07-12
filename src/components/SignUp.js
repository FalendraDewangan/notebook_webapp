import React from 'react'

function SignUp(props) {
    const handleSubmit = async(event) => {
        event.preventDefault();
        let n = document.getElementById('name').value;
        let e = document.getElementById('email').value;
        let p = document.getElementById('password').value;

        let response = await fetch("http://localhost:5000/api/auth/signup", {
            method: 'POST', // 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": n,
                "email": e,
                "password": p
            }) // body data type must match "Content-Type" header
        });
        if(!response.status===200){
            props.showAlert("Some error occurred","danger")
            window.location.href="/"
        }
        response = await response.json();
        localStorage.setItem('token',response.authToken)
        props.showAlert("New User Created", "success")
        window.location.href="/"
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
