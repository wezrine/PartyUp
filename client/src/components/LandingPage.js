import { NavLink } from 'react-router-dom'

function LandingPage() {
    return (
            <section className="hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Hello, Gamers!</h1>
                        <h2 className="subtitle">Form a party, because we know you've never been to one!</h2>
                        <NavLink to='/login' className="button is-info">Get Started</NavLink>
                    </div>
                </div>
            </section>
    )
}

export default LandingPage