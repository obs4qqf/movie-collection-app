import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'
import MoviePage from './components/MoviePage'
import Credits from './components/Credits'

function App() {
  const [movieData, setMovieData] = useState([])
  const [movieDetails, setMovieDetails] = useState({})
  const [showMovieDetails, setShowMovieDetails] = useState(false)

  const addMovie = async (movie) => {
    const res = await fetch(`/movie?title=${movie}`)
    const data = await res.json()
    console.log(data)
    const newMovies = data.results.map(result => {
      return {
        id: result.id,
        title: result.title,
        date: result.release_date,
        image: result.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+result.poster_path : null,
        description: result.overview.length > 280 ? result.overview.substring(0,280) : result.overview
      }
    })
    setMovieData(newMovies)
  }

  const getDetails = async (id) => {
    const res = await fetch(`/movie?id=${id}`)
    const data = await res.json()
    console.log(data)
    const details = {
      title: data.original_title,
      date: data.release_date,
      runtime: data.runtime,
      country: data.production_countries[0].name,
      genres: data.genres[0].name,
      image: data.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+data.poster_path : null,
      description: data.overview
    }
    setMovieDetails(details)
    setShowMovieDetails(true)
  }

  return (
    <div className="app">
      <SearchMovie addMovie={addMovie} />
      {!showMovieDetails ? <Movies movieData={movieData} getDetails={getDetails} />
        : <MoviePage movieDetails={movieDetails}/>}
      <Credits />
    </div>
  );
}

export default App;
