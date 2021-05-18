
function GamesList (props) {

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
                            <p>5 Online</p>
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

                            <p>Started {hours < 10 ? hours.toString().slice(0,1) : hours.toString().slice(0,2)} hours ago</p>
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
                            <p onClick={() => handleJoin(party._id)} className="card-footer-item">Join</p>
                        </footer>
                    </div>
                </div>
        )
    })

    return (
        <div className="party-content">
            {partyItems}
        </div>
    )
}

export default GamesList