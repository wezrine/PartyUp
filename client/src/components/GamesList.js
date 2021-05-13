
function GamesList (props) {

    const parties = props.parties
    
    const partyItems = parties.map((party, index) => {
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

                            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
                            <a href="#" className="card-footer-item">Join</a>
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