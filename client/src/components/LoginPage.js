
import { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthenticationHeader } from './utils/authenticate'
import { NavLink} from 'react-router-dom'
import * as actionCreators from './store/creators/actionCreators'


const LoginPage = (props) => {

    const [user, setUser] = useState({})

    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value 
        })
    }  

    const handleLogin = () => {
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({user})
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token
                const username = result.username
                const firstName = result.firstName
                const userId = result.userId
                console.log(result)
                // get the token and put it in local storage
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", username)
                localStorage.setItem("firstName", firstName)
                localStorage.setItem("userId", userId)
                // set the authentication header
                setAuthenticationHeader(token)
                // dispatch to redux
                props.onLogin()
                // take the user to the dashboard screen
                props.history.push('/profile')
            }
        })
    }

    return (
        <div>
            <div>
                <h3>Login</h3>
                <input onChange = {handleOnChange} type="text" placeholder="Username" name="username"></input>
                <input onChange = {handleOnChange} type="password" placeholder="Password" name="password"></input>
                <button onClick = {handleLogin}>Login</button>
            </div>
            <NavLink to = "/registration"><div className="link bootstrap-link">Register</div></NavLink>
        </div>

    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch(actionCreators.userLogin(token))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)