
function PartiesPage() {

    

    const handleSearch = () => {
        
    }

    return (
        <div>
            <div className="is-flex is-justify-content-center add-party-container">
                <button onClick={handleSearch} className="button is-info">Create A New Party</button>
            </div>
            <div className="party-content">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg?t=1592263625" alt="Placeholder image" />
                        </figure>
                    </div>
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
                                <span class="tag is-danger">
                                    Casual
                                </span>
                                <span class="tag is-danger">
                                    Mic
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">Edit</a>
                            <a href="#" class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PartiesPage