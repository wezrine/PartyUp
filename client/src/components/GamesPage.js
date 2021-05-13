import React, { Fragment, useState } from 'react'
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
        <Fragment>
            <div className="page-container" style={{ backgroundImage: `linear-gradient(to bottom, rgba(27,40,56) 0%,rgba(27,40,56,0.7) 100%), url(${backgroundURL})`, }}>
            
                <div className="find-party-content">
                    <div className="is-flex is-justify-content-center searchbar-container">
                        <div className="is-flex searchbar">
                            <Search gameClicked={getParties} />
                        </div>
                    </div>
                    <GamesList parties={parties} />
                </div>
            </div>
        </Fragment>
    )
}

export default GamesPage