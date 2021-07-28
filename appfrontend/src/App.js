import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'
import logo from './TMDbLogo.svg'

function App() {
  const [movieData, setMovieData] = useState([])

  const addMovie = async (movie) => {
    const res = await fetch(`/movie?title=${movie}`)
    const data = await res.json()
    console.log(data)
    const newMovies = data.results.map(result => {
      return {
        id: result.id,
        title: result.title,
        image: 'https://image.tmdb.org/t/p/original/'+result.poster_path,
        description: result.overview
      }
    })
    setMovieData(newMovies)
  }

  return (
    <div className="app">
      <SearchMovie addMovie={addMovie} />
      <Movies movieData={movieData} />
      <h4>This product uses the TMDb API but is not endorsed or certified by TMDb.</h4>
      <img src={logo} alt="TMDb Logo"/>
    </div>
  );
}

export default App;
