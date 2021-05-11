
function GamesPage() {

    const handleSearch = () => {
        
    }

    return (
        <div style={{backgroundImage: `url(${"https://steamcdn-a.akamaihd.net/steam/apps/20/page_bg_generated_v6b.jpg?t=1592263625"})`}}>
            <div className="is-flex is-justify-content-center searchbar-container">
                <div className="is-flex searchbar">
                    <input className="input" type="text" placeholder="Search for a game"/>
                    <button onClick = {handleSearch} className="button is-info">Search</button>
                </div>
            </div>
            <div className="game-content" >
                <div className="card">
                    <div className="card-content">
                        <div className="is-flex is-justify-content-flex-end">
                            <p>5 Online</p>
                        </div>
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">Peaky Blinderz</p>
                                <p className="subtitle is-6">Terraria</p>
                            </div>
                        </div>

                        <div className="content">
                            Gamers who are cool. We like to play video games and would like to play with you too.
                            <br />

                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
                <div className="card">
                    <div className="card-content">
                        <div className="is-flex is-justify-content-flex-end">
                            <p>5 Online</p>
                        </div>
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">Peaky Blinderz</p>
                                <p className="subtitle is-6">Terraria</p>
                            </div>
                        </div>

                        <div className="content">
                            Gamers who are cool. We like to play video games and would like to play with you too.
                            <br />

                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
            </div>
        </div>
    )
}

export default GamesPage