import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'
import logo from './TMDbLogo.svg'

function App() {
  const [movieData, setMovieData] = useState([
    {
      id: 1,
      title: "Movie 1",
      genre: "Genre",
      description: "Description"
    },
    {
      id: 2,
      title: "Movie 2",
      genre: "Genre",
      description: "Description"
    },
    {
      id: 3,
      title: "Movie 3",
      genre: "Genre",
      description: "Description"
    }
  ])

  const addMovie = async (movie) => {
    const res = await fetch(`http://localhost:5000/movie?title=${movie}`)
    const data = await res.json()
    console.log(data)
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
