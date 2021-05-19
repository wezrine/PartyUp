import { Fragment } from 'react'


function FindPartyList (props) {

    const parties = props.parties
    
    const partyItems = parties.map((party, index) => {

        const handleJoin = (partyId) => {
            props.onJoinParty(partyId)
        }

        const currentDate = Date()
        const dateOneObj = new Date(party.dateCreated);
        const dateTwoObj = new Date(currentDate);
        const milliseconds = Math.abs(dateTwoObj - dateOneObj);
        const hours = milliseconds / 36e5;

        return (
                <div className="card" key={index}>
                    <div className="card-content">
                        <div className="is-flex is-justify-content-flex-end">
                            <p>{party.members.length}/{party.maxMembers} members</p>
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
                            {party.maxMembers <= party.members.length ? <p className="card-footer-item">Party Full</p> : <p onClick={() => handleJoin(party._id)} className="card-footer-item hover">Join</p>}
                        </footer>
                </div>
        )
    })

    return (
        <Fragment>
            {partyItems}
        </Fragment>
    )
}

export default FindPartyList