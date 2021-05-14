import { Fragment } from 'react';

function MyPartiesList (props) {

    const parties = props.parties

    const partyItems = parties.map((party, index) => {

        const handleLeaveParty = (partyId) => {
            props.leaveParty(partyId)
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
                        {party.description}
                            <br />

                        <time datetime="2016-1-1">Time</time>
                        <div>
                            <span className="tag is-danger">
                                Casual
                                </span>
                            <span className="tag is-danger">
                                Mic
                                </span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <footer className="card-footer">
                        <p href="#" className="card-footer-item">Edit</p>
                        <p onClick={() => handleLeaveParty(party._id)} className="card-footer-item">Leave</p>
                    </footer>
                </div>
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