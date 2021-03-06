import { Fragment } from 'react';
import { NavLink } from 'react-router-dom'

function MyPartiesList (props) {
    
    const parties = props.parties

    const partyItems = parties.map((party, index) => {

        const handleLeaveParty = (partyId) => {
            props.leaveParty(partyId)
        }

        const handleEditParty = (party) => {
            props.editParty(party)
        }

        const currentDate = Date()
        const dateOneObj = new Date(party.dateCreated);
        const dateTwoObj = new Date(currentDate);
        const milliseconds = Math.abs(dateTwoObj - dateOneObj);
        const hours = milliseconds / 36e5;

        return (
            <div className="card" key={index}>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={party.background} alt="Game background" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="is-flex is-justify-content-flex-end">
                        <p>{party.members.length}/{party.maxMembers} Members</p>
                    </div>
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{party.partyName}</p>
                            <p className="subtitle is-6">{party.gameTitle}</p>
                        </div>
                    </div>
                    <div className="content">
                            <p className="party-description">{party.description}</p>
                            <p className="party-time">Started {hours < 10 ? hours.toString().slice(0,1) : hours.toString().slice(0,2)} hours ago</p>
                    </div>
                </div>
                <footer className="card-footer">
                        <NavLink to={`/party/${party._id}`} className="chat-link card-footer-item hover">Chat</NavLink>
                        <p onClick={() => handleEditParty(party)} className="card-footer-item hover">Edit</p>
                        <p onClick={() => handleLeaveParty(party._id)} className="card-footer-item hover">Leave</p>
                </footer>
            </div>
        )
    })

    return (
        <Fragment>
            {partyItems ? partyItems : <h3>Loading...</h3>}
        </Fragment>
    )
}

export default MyPartiesList