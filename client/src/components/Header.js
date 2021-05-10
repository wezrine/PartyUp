import logo from './logo.png'
import logoWhite from './logoWhite.png'
import { NavLink } from 'react-router-dom'

function Header() {

    return (
            <nav className="navbar level is-dark">
                <p className="level-item has-text-centered">
                    <NavLink to='/search' className="link is-info">Search</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <NavLink to='/games' className="link is-info">Games</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <img className="logo" src={logoWhite} alt="" />
                </p>
                <p className="level-item has-text-centered">
                    <NavLink to='/groups' className="link is-info">Groups</NavLink>
                </p>
                <p className="level-item has-text-centered">
                    <NavLink to='/profile' className="link is-info">Profile</NavLink>
                </p>
            </nav>

    )
}

export default Header