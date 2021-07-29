import {useState} from 'react'

const SearchMovie = ({addMovie}) => {
    const [movieName, setMovieName] = useState('')

    return (
        <header>
            <h1>Search a movie below:</h1>
            <div id='search-form'>
                <input type='text' onChange={(e) => setMovieName(e.target.value)} placeholder='Movie name'/>
                <button onClick={() => addMovie(movieName)}>Search Movie</button>
            </div>
        </header>
    )
}

export default SearchMovie
