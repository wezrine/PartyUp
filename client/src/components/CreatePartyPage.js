import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function AddPartyPage() {

    let history = useHistory()

    const [party, setParty] = useState({})

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
        }).then(history.push('/party'))
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <article className="">
                                <p className="name">Party</p>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Party Name' name='partyName' />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Game Title' name='gameTitle' />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Description' name='description' />
                            </article>
                        </div>
                    </div>
                </div>
                <div> 
                    <button onClick={handleAddParty} className="button is-link">Add Party</button>
                </div>
            </div>
        </div>
        
    )
}

export default AddPartyPage