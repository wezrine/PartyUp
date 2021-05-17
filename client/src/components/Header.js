import React, { useState } from 'react'
import logo from './logo.png'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAuthenticationHeader } from './utils/authenticate';
import * as actionCreators from './store/creators/actionCreators'

function Header(props) {

    const [isBurgerActive, setisBurgerActive] = useState(false)

    const signOut = () => {
        // remove token from local storage
        localStorage.removeItem('jsonwebtoken')
        localStorage.removeItem('username')
        localStorage.removeItem('firstName')
        localStorage.removeItem('userId')

        // clear up the authentication headers
        setAuthenticationHeader(null)

        // perform a dispatch and set the isAuthenticated globle state to false
        props.onSignOut()

        // redirect to home page
        window.location.replace('/')
    }


    return (
            <nav className="navbar is-black" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink to='/' className="navbar-item">
                        <img src={logo} />
                    </NavLink>

                        <p onClick={() => { setisBurgerActive(!isBurgerActive) }} role="button" className={`navbar-burger burger ${isBurgerActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </p>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <p className="navbar-item">
                            <NavLink to='/about' onClick={() => { setisBurgerActive(!isBurgerActive) }} className="link">About</NavLink>
                        </p>

                        <p className="navbar-item">
                            <NavLink to='/find-party' onClick={() => { setisBurgerActive(!isBurgerActive) }} className="link">Find a Party</NavLink>
                        </p>

                        <p className="navbar-item">
                            {props.isAuthenticated ? <NavLink to='/my-parties' onClick={() => { setisBurgerActive(!isBurgerActive) }} className="link">My Parties</NavLink> : null}
                        </p>

                        <p className="navbar-item">
                            {props.isAuthenticated ? <NavLink to='/profile' onClick={() => { setisBurgerActive(!isBurgerActive) }} className="link">Profile</NavLink> : null}
                        </p>


                        
                    </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <p className="login navbar-item">
                                        {props.isAuthenticated ? <button className="button is-danger" onClick={signOut}><strong>Sign Out</strong></button> : <NavLink to='/login' onClick={() => { setisBurgerActive(!isBurgerActive) }} className="button is-danger"><strong>Login</strong></NavLink>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

    )
}

const mapStateToProps = (state) => {
    return {
                    isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
                    onSignOut: () => dispatch(actionCreators.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)