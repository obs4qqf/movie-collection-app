import { useState, useEffect } from 'react'
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

  return (
    <div className="App">
      <header className="App-header">
        <SearchMovie />
        <Movies movieData={movieData} />
      </header>
    </div>
  );
}

export default App;
