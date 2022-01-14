import {useState} from 'react'

const SearchMovie = ({navigateSearch}) => {
    const [movieName, setMovieName] = useState('')

    return (
        <header>
            <div id='search-form'>
                <input type='text' onChange={(e) => setMovieName(e.target.value)} placeholder='Movie name'/>
                <button onClick={() => navigateSearch(movieName)}>Search Movie</button>
            </div>
        </header>
    )
}

export default SearchMovie
