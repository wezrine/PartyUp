import logo from './logo.png'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAuthenticationHeader } from './utils/authenticate';
import * as actionCreators from './store/creators/actionCreators'

function Header(props) {

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
            <nav className="navbar level is-black">
                <p className="level-item has-text-centered">
                    <NavLink to='/about' className="link">About</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <NavLink to='/games' className="link">Find a Party</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <img className="logo" src={logo} alt="" />
                </p>
                <p className="level-item has-text-centered">
                {props.isAuthenticated ? <NavLink to='/parties' className="link">Your Parties</NavLink> : null}
                </p>
                <p className="level-item has-text-centered">
                {props.isAuthenticated ? <NavLink to='/profile' className="link">Profile</NavLink> : null}
                </p>
                
                <p className="level-item has-text-centered">
                {props.isAuthenticated ? <div className="nav-link" onClick={signOut}><strong>Sign Out</strong></div> : <a className="nav-link active" href="/login"><strong>Login/Register</strong></a>}
                </p>
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