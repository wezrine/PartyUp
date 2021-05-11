import logo from './logo.png'

import { NavLink } from 'react-router-dom'

function Header() {

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
                    <NavLink to='/parties' className="link">Your Parties</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <NavLink to='/profile' className="link">Profile</NavLink>
                </p>
            </nav>

    )
}

export default Header