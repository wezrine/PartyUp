import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import MyPartiesList from './MyPartiesList'
import Search from './Search'

function MyPartiesPage() {

    let history = useHistory()

    const [isAddModalActive, setIsAddModalActive] = useState(false)
    const [isEditModalActive, setIsEditModalActive] = useState(false)
    const [editedParty, setEditedParty] = useState({})
    const [party, setParty] = useState({})
    const [parties, setParties] = useState([])

    useEffect (() => {
        getMyParties()
    }, [])

    const openAddModal = () => {
        setIsAddModalActive(true)
    }

    const closeAddModal = () => {
        setIsAddModalActive(false)
    }

    const closeEditModal = () => {
        setIsEditModalActive(false)
        setEditedParty({})
    }

    const handleOnChange = (e) => {
        setParty({
            ...party,
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            dateCreated: Date().toString().slice(4,21),
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeEditedParty = (e) => {
        setEditedParty({
            ...editedParty,
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
            setIsAddModalActive(false)
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

    const openEditParty = (party) => {
        setIsEditModalActive(true)
        setEditedParty(party)
    }

    const updateParty = (updatedParty) => {
        fetch('http://localhost:8080/party', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({updatedParty})
        }).then(() => {
            closeEditModal()
            getMyParties()
        })
    }

    return (
        <div className="my-parties-background">
            <div className="is-flex is-justify-content-center add-party-container">
                <button onClick={openAddModal} className="button is-info">Create A Party</button>
            </div>
            <div className="party-content">
                <MyPartiesList parties = {parties} leaveParty = {removeUserFromParty} editParty = {openEditParty} />
            </div>
            <div className={`modal ${isAddModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="add modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create Party</p>
                        <button onClick={closeAddModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <Search gameClicked={getGameData} />
                        <input onChange={handleOnChange} id="partyName" className='input' type='text' placeholder='Party Name' name='partyName' />
                        <input onChange={handleOnChange} id="description" className='input' type='text' placeholder='Description' name='description' />
                        <input onChange={handleOnChange} id="maxMembers" type="number" className="input" min="2" max="32" placeholder="Number of Members" name="maxMembers"/>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleAddParty} className="button is-danger">Create Party</button>
                        <button onClick={closeAddModal} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
            <div className={`modal ${isEditModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="add modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit Party</p>
                        <button onClick={closeEditModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <input onChange={handleOnChangeEditedParty} className='input' type='text' placeholder='Party Name' name='partyName' defaultValue={editedParty.partyName}/>
                        <input onChange={handleOnChangeEditedParty} className='input' type='text' placeholder='Description' name='description' defaultValue={editedParty.description}/>
                        <input onChange={handleOnChangeEditedParty} type="number" className="input" min="2" max="32" placeholder="Number of Members" name="maxMembers" defaultValue={editedParty.maxMembers}/>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => updateParty(editedParty)} className="button is-danger">Update Party</button>
                        <button onClick={closeEditModal} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>

    )
}

export default MyPartiesPage