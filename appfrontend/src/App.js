import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'

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

  const addMovie = (movie) => {
    setMovieData([...movieData, {id: 4, title: movie, genre: 'Genre', description: 'Desc'}])
  }

  return (
    <div className="app">
      <SearchMovie addMovie={addMovie} />
      <Movies movieData={movieData} />
    </div>
  );
}

export default App;
