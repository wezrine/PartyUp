import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom";
import GamesList from './GamesList'
import Search from './Search';

function GamesPage() {

    let history = useHistory()

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

    const updateParty = (partyId) => {
        const userId = localStorage.getItem('userId')
        fetch(`http://localhost:8080/party/join/${partyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        }).then(() => {
            history.push('/my-parties')
        })
    }

    return (
        <Fragment>
            <div className="page-container" style={{ backgroundImage: `linear-gradient(to bottom, rgba(27,40,56) 0%,rgba(27,40,56,0.7) 100%), url(${backgroundURL})`, }}>
            
                <div className="find-party-content">
                    <div className="is-flex is-justify-content-center searchbar-container">
                        <div className="is-flex searchbar">
                            <Search gameClicked={getParties} />
                        </div>
                    </div>
                    <GamesList parties={parties} onJoinParty={updateParty} />
                </div>
            </div>
        </Fragment>
    )
}

export default GamesPage