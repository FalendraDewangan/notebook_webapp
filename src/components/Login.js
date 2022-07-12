import React from 'react'

function Login(props) {
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        let e = document.getElementById('email').value;
        let p = document.getElementById('password').value

        let response = await fetch("http://localhost:5000/api/auth/signin", {
            method: 'POST', // 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e,
                password: p
            }) // body data type must match "Content-Type" header
        });
        if(!response.status===200){
            props.showAlert("Invalid Credential","danger")
            window.location.href="/"
        }
        
        response = await response.json()
        console.log(response)
        localStorage.setItem('token',response.authToken)
        props.showAlert("Logged In Successfully","success")
        window.location.href="/"
        
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
