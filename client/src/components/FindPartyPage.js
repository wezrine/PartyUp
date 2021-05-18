import React, { Fragment, useState } from 'react'
import { useHistory, NavLink } from "react-router-dom";
import FindPartyList from './FindPartyList'
import Search from './Search';

function FindPartyPage() {

    let history = useHistory()

    const [parties, setParties] = useState([])
    const [backgroundURL, setBackgroundURL] = useState('')
    const [hasSearched, setHasSearched] = useState(false)

    const getParties = (game) => {
        setHasSearched(true)
        setBackgroundURL(game.background_image)
        fetch(`http://localhost:8080/party/game/${game.name}`)
            .then(response => response.json())
            .then(parties => {
                setParties(parties)
            })
    }

    const updateParty = (partyId) => {
        const userId = localStorage.getItem('userId')
        const username = localStorage.getItem('username')
        fetch(`http://localhost:8080/party/join/${partyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, username})
        }).then(() => {
            history.push('/my-parties')
        })
    }

    return (
        <Fragment>
            <div className="page-container" style={{ backgroundImage: `linear-gradient(to bottom, rgba(27,40,56) 0%,rgba(27,40,56,0.7) 100%), url(${backgroundURL})`, }}>
            
                <div className="find-party-content">
                    <div className="is-flex is-justify-content-center searchbar-container">
                        <div className="is-flex is-flex-direction-column searchbar">
                            <Search gameClicked={getParties} />
                        </div>
                    </div>
                    <div className="party-content">
                        {parties.length == 0 && hasSearched == true ? <div className="no-parties-container is-flex is-justify-content-center is-flex-direction-column"><div className="no-parties">No Parties?</div><NavLink to='/my-parties' className='button is-info cta'>Create a Party</NavLink></div> : ''}
                        <FindPartyList parties={parties} onJoinParty={updateParty} />
                    </div>
                    
                    
                </div>
            </div>
        </Fragment>
    )
}

export default FindPartyPage