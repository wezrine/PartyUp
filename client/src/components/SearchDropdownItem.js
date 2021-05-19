
export default function SearchDropdownItem(props) {

    const result = props.result

    const handleClick = (result) => {
      props.gameClicked(result)
    }

    return (
      <div onClick={() => handleClick(result)} className="dropdown-item">
        <li key={result.id + 'li'} className='is-flex dropdown-li my-1 text-nowrap d-inline-block text-truncate result-list-width'>
            {result.background_image ? (
              <img
                className='autocomplete-img-style'
                width='45'
                height='45'
                alt={result.name}
                key={result.id + 'img'}
                src={
                  result.background_image.match(/media\/screenshots/)
                    ? result.background_image.replace('media/screenshots', 'media/resize/80/-/screenshots')
                    : result.background_image.replace('media/games', 'media/resize/80/-/games')
                }
              />
            ) : (
              <svg width='45' height='45'>
                <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                Sorry, your browser does not support inline SVG.
              </svg>
            )}
            <span key={result.id + 'span'} className='mx-1'>
              {result.released && result.name.includes(result.released.match(/[0-9]{4}/))
                ? result.name.replace(/\([0-9]{4}\)/, '').trim()
                : result.name}{' '}
              ({result.released ? result.released.match(/[0-9]{4}/) : 'n/a'})
            </span>
          </li>
      </div>
    );
  }
  
  export function SearchDropdownItemNoResult() {
    return (
      <li className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
        <span className='mx-1'>No results found...</span>
      </li>
    );
  }