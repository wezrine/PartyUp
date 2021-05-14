import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import MyPartiesList from './MyPartiesList'
import Search from './Search'

function MyPartiesPage() {

    let history = useHistory()

    const [isModalActive, setIsModalActive] = useState(false)
    const [party, setParty] = useState({})
    const [parties, setParties] = useState([])
    const [members, setMembers] = useState([])

    useEffect (() => {
        getMyParties()
    }, [])

    const openModal = () => {
        setIsModalActive(true)
    }

    const closeModal = () => {
        setIsModalActive(false)
    }

    const handleOnChange = (e) => {
        setParty({
            ...party,
            userId: localStorage.getItem('userId'),
            [e.target.name]: e.target.value
        })
    }

    const handleAddParty = () => {
        fetch('http://localhost:8080/party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(party)
        }).then(() => {
            setIsModalActive(false)
            getMyParties()
            const partyName = document.getElementById('partyName')
            const description = document.getElementById('description')
            const gameTitle = document.getElementById('searchbar')
            const maxMembers = document.getElementById('maxMembers')
            partyName.value = ""
            description.value = ""
            gameTitle.value = ""
            maxMembers.value = ""
        })
    }

    const getGameData = (game) => {
        setParty({
            ...party,
            gameTitle: game.name,
            background: game.background_image
        })
    }

    const getMyParties = () => {
        const userId = localStorage.getItem('userId') 
        fetch(`http://localhost:8080/party/my-parties/${userId}`)
        .then(response => response.json())
        .then(parties => {
            setParties(parties)
        })
    }

    const removeUserFromParty = (partyId) => {
        const userId = localStorage.getItem('userId')
        fetch(`http://localhost:8080/party/leave/${partyId}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(result => {
            getMyParties()
        })
    }

    return (
        <div>
            <div className="is-flex is-justify-content-center add-party-container">
                <button onClick={openModal} className="button is-info">Create A New Party</button>
            </div>
            <div className="party-content">
                <MyPartiesList parties = {parties} members = {members} leaveParty = {removeUserFromParty} />
            </div>
            <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create a Party</p>
                        <button onClick={closeModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <Search gameClicked={getGameData} />
                        <input onChange={handleOnChange} id="partyName" className='input' type='text' placeholder='Party Name' name='partyName' />
                        <input onChange={handleOnChange} id="description" className='input' type='text' placeholder='Description' name='description' />
                        <input onChange={handleOnChange} id="maxMembers" type="number" className="input" min="2" max="32" placeholder="Number of Members" name="maxMembers"/>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleAddParty} className="button is-danger">Create Party</button>
                        <button onClick={closeModal} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>

    )
}

export default MyPartiesPage