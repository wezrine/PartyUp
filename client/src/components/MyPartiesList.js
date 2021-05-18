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

        return (
            <div className="card" key={index}>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={party.background} alt="Placeholder image" />
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
                            <p className="party-time">{party.dateCreated}</p>
                    </div>
                </div>
                <footer className="card-footer">
                        <NavLink to={`/party/${party._id}`} className="card-footer-item">Chat</NavLink>
                        <p onClick={() => handleEditParty(party)} className="card-footer-item">Edit</p>
                        <p onClick={() => handleLeaveParty(party._id)} className="card-footer-item">Leave</p>
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