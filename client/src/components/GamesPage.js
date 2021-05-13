import React, { useState } from 'react'
import GamesList from './GamesList'
import Search from './Search';

function GamesPage() {

    const [parties, setParties] = useState([])
    const [backgroundURL, setBackgroundURL] = useState('')

    const getParties = (game) => {

        setBackgroundURL(game.background_image)
    
        fetch(`http://localhost:8080/party/${game.name}`)
        .then(response => response.json())
        .then(parties => {
            setParties(parties)
        })
    }

    // console.log(gameBackground)

    return (
        <div className="page-container" style={{backgroundImage: `url(${backgroundURL})`}}>
            <div className="is-flex is-justify-content-center searchbar-container">
                <div className="is-flex searchbar">
                    <Search gameClicked={getParties} />
                </div>
            </div>
            <GamesList parties = {parties}/>
        </div>
    )
}

export default GamesPage