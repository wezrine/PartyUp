import React, { useState } from 'react'
import GamesList from './GamesList'

function GamesPage() {
    
    const [parties, setParties] = useState([])
    const [search, setSearch] = useState({})

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = () => {
        const appId = search.searchGame
        fetch(`http://localhost:8080/party/${appId}`)
        .then(response => response.json())
        .then(parties => {
            setParties(parties)
        })
    }

    return (
        <div className="page-container" style={{backgroundImage: `url(${"https://steamcdn-a.akamaihd.net/steam/apps/20/page_bg_generated_v6b.jpg?t=1592263625"})`}}>
            <div className="is-flex is-justify-content-center searchbar-container">
                <div className="is-flex searchbar">
                    <input onChange={handleChange} className="input" type="text" placeholder="Search 1172470" name='searchGame'/>
                    <button onClick = {handleSearch} className="button is-info">Search</button>
                </div>
            </div>
            <GamesList parties = {parties} />
        </div>
    )
}

export default GamesPage