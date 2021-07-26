import {useState} from 'react'

const SearchMovie = ({addMovie}) => {
    const [movieName, setMovieName] = useState('')

    return (
        <div>
            <h4>Search a movie below:</h4>
            <input type='text' onChange={(e) => setMovieName(e.target.value)} placeholder='Movie name'/>
            <button onClick={() => addMovie(movieName)}>Search Movie</button>
        </div>
    )
}

export default SearchMovie
