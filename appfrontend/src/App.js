import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'
import Credits from './components/Credits'

function App() {
  const [movieData, setMovieData] = useState([])
  const [movieDetails, setMovieDetails] = useState({})

  const addMovie = async (movie) => {
    const res = await fetch(`/movie?title=${movie}`)
    const data = await res.json()
    console.log(data)
    const newMovies = data.results.map(result => {
      return {
        id: result.id,
        title: result.title,
        date: result.release_date,
        image: result.poster_path !== null ? 'https://image.tmdb.org/t/p/original/'+result.poster_path : null,
        description: result.overview.length > 280 ? result.overview.substring(0,280)+' ...Read More' : result.overview
      }
    })
    setMovieData(newMovies)
  }

  const getDetails = async (id) => {

  }

  return (
    <div className="app">
      <SearchMovie addMovie={addMovie} />
      <Movies movieData={movieData} getDetails={getDetails} />
      <Credits />
    </div>
  );
}

export default App;
