
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const RegistrationPage = () => {

    const [user, setUser] = useState({})

    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value 
        })
    }  

    const handleRegistration = () => {
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({user})
        }).then(window.location.href = "/login")
    }
    
    return (
        <div>
            <div>
                <h3>Register</h3>
                <input onChange={handleOnChange} type="text" placeholder="Enter first name" name="firstName"></input>
                <input onChange={handleOnChange} type="text" placeholder="Create username" name="username"></input>
                <input onChange={handleOnChange} type="password" placeholder="Create password" name="password"></input>
                <button onClick={handleRegistration}>Register</button>
                <NavLink to = "/login"><div className="link bootstrap-link">Login</div></NavLink>
            </div>
        </div>

    )
}

export default RegistrationPage