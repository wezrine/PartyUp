import { Fragment, useState } from 'react';
import SearchDropdownItem, { SearchDropdownItemNoResult } from './SearchDropdownItem';

function Search(props) {
    const [data, setData] = useState(null);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [dropdownIsopened, setDropdownIsopened] = useState(false);
    // const [keyword, setKeyword] = useState('');

    async function getRawgApi(gameName) {
        if (gameName !== '') {
            try {
                const response = await fetch(`http://localhost:8080/api/search?search=${gameName.toLowerCase()}`);
                const json = await response.json();
                setData(json);
                setDataIsReady(true);
            } catch (err) {
                console.error(err);
            }
        }
    }


    const handleChange = event => {
        setDropdownIsopened(true)
        getRawgApi(event.target.value)
    }

    const closeDropdown = () => {
        setDropdownIsopened(false)
    }

    const gameClicked = (game) => {
        setDropdownIsopened(false)
        const searchbar = document.getElementById('searchbar')
        searchbar.value = game.name
        props.gameClicked(game)
    }

    return (
        <Fragment>
            <div>
                <input
                    id="searchbar"
                    className="input"
                    type="text"
                    placeholder="Enter a Game"
                    autoComplete="off"
                    onChange={handleChange}
                    name="gameTitle" />
                {dataIsReady ? (
                    <Fragment>
                        {dropdownIsopened ? (
                            <div className="dropdown-content">
                                <ul>
                                    {data.count >= 1 ? (data.results.slice(0, 8).map(result => <SearchDropdownItem gameClicked={gameClicked} key={result.id} result={result}/>)) : (<SearchDropdownItemNoResult />)}
                                </ul>
                                <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
                            </div>
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        </Fragment>
    )
}

export default Search;