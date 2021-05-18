
import { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthenticationHeader } from './utils/authenticate'
import * as actionCreators from './store/creators/actionCreators'


const LoginPage = (props) => {

    const [user, setUser] = useState({})
    const [isRegisterActive, setisRegisterActive] = useState(false)
    const [message, setMessage] = useState('')

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
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", result.username)
                localStorage.setItem("userId", result.userId)
                setAuthenticationHeader(token) // set the authentication header
                props.onLogin(token)
                props.history.push('/find-party') // take the user to the landing screen
            } else {
                setMessage(result.message)
            }
        })
    }

    const handleContinueAsGuest = () => {

        let guest = {
            username: 'Guest',
            password: 'guest123'
        }

        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(guest)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                const token = result.token
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("username", result.username)
                localStorage.setItem("userId", result.userId)
                setAuthenticationHeader(token) // set the authentication header
                props.onLogin(token)
                props.history.push('/find-party') // take the user to the landing screen
            }
        })
    }

    const handleRegister = () => {
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(result => {
            if (result.success == false) {
                setMessage(result.message)
            } else {
                setisRegisterActive(false)
            }
        })
    }


    return (
        <div className="login-box">
            <div className="login modal-card">
                <header className="modal-card-head">
                    {isRegisterActive ? <p className="modal-card-title">Register</p> : <p className="modal-card-title">Login</p>}
                </header>
                <section className="modal-card-body vertical">
                    <div className='login-row is-flex'>
                        <span className="icon"><i className="fas fa-user"></i></span>
                        <input onChange={handleOnChange} className="login input" type="text" placeholder="Username" name="username" />
                    </div>
                    <div className='login-row is-flex'>
                        <span className="icon"><i className="fas fa-lock"></i></span>
                        <input onChange={handleOnChange} className="login input" type="password" placeholder="Password" name="password" />
                    </div>
                    <div className="err-message">
                        {message}
                    </div>
                </section>
                <footer className="login modal-card-foot">
                    <div>
                        {isRegisterActive ? <button onClick={handleRegister} className="button is-link">Register</button> : <button onClick={handleLogin} className="button is-link">Login</button>}
                        {isRegisterActive ? <button className="button" onClick={() => { setisRegisterActive(false) }}>Login</button> : <button className="button" onClick={() => { setisRegisterActive(true) }}>Register</button>}
                    </div>
                    {isRegisterActive ? '' : <button onClick={handleContinueAsGuest} className="guest button">Continue as Guest</button>}
                </footer>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch(actionCreators.userLogin(token))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)