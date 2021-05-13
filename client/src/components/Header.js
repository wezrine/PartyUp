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
                    <a className="navbar-item" href="https://bulma.io">
                        <img src={logo} />
                    </a>

                        <p onClick={() => { setisBurgerActive(!isBurgerActive) }} role="button" className={`navbar-burger burger ${isBurgerActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </p>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <p className="navbar-item">
                            <NavLink to='/about' className="link">About</NavLink>
                        </p>

                        <p className="navbar-item">
                            <NavLink to='/games' className="link">Find a Party</NavLink>
                        </p>

                        <p className="navbar-item">
                            {props.isAuthenticated ? <NavLink to='/my-parties' className="link">My Parties</NavLink> : null}
                        </p>

                        <p className="navbar-item">
                            {props.isAuthenticated ? <NavLink to='/profile' className="link">Profile</NavLink> : null}
                        </p>


                        
                    </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <p className="navbar-item">
                                        {props.isAuthenticated ? <div className="button is-danger" onClick={signOut}><strong>Sign Out</strong></div> : <NavLink to='/login' className="button is-danger" href="/login"><strong>Login</strong></NavLink>}
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