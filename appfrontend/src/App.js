import { useState } from 'react'
import SearchMovie from './components/SearchMovie'
import Movies from './components/Movies'
import MoviePage from './components/MoviePage'
import Credits from './components/Credits'
import SignIn from './components/SignIn'

function App() {
  const [currentSearch, setCurrentSearch] = useState("")
  const [movieData, setMovieData] = useState([])
  const [movieDetails, setMovieDetails] = useState({})
  const [showMovieDetails, setShowMovieDetails] = useState(false)
  const [showHomeScreen, setShowHomeScreen] = useState(true)
  const [searchError, setSearchError] = useState(false)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [pageNumbers, setPageNumbers] = useState([])
  const [totalPages, setTotalPages] = useState(-1)
  const [totalResults, setTotalResults] = useState(-1)
  const [signedIn, setSignedIn] = useState({})

  const addMovie = async (movie, page = 1) => {
    if (movie != '') {
      const res = await fetch(`/movie?title=${movie}&page=${page}`)
      const data = await res.json()
      console.log(data)
      const newMovies = data.results.map(result => {
        return {
          id: result.id,
          title: result.title,
          date: result.release_date,
          image: result.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+result.poster_path : null,
          description: result.overview
        }
      })
      setMovieData(newMovies)
      setShowHomeScreen(false)
      setSearchError(false)
      setTotalPages(data.total_pages)
      getPageNumbers(data.total_pages)
      setCurrentPageNumber(page)
      setCurrentSearch(movie)
      setTotalResults(data.total_results)
      window.scrollTo(0, 0) // Auto-scroll to top of window after keyword search or page change
    } else {
      setSearchError(true)
    }
  }

  const getDetails = async (id) => {
    if (movieDetails === {} || movieDetails.id !== id) {
      const res = await fetch(`/movie?id=${id}`)
      const data = await res.json()
      console.log(data)

      let genreNames = ""
      let counter = 1
      if (data.genres.length !== 0) {
        data.genres.forEach(genre => {
          if (counter === 1) {
            genreNames = genre.name
          } else {
            genreNames += (", "+genre.name)
          }
          counter += 1
        })
      }

      const details = {
        id: data.id,
        title: data.original_title,
        date: data.release_date ? data.release_date : "",
        runtime: data.runtime ? data.runtime : "",
        country: data.production_countries.length !== 0 ? data.production_countries[0].name : "",
        genres: data.genres.length !== 0 ? genreNames : "",
        image: data.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+data.poster_path : null,
        description: data.overview ? data.overview : ""
      }
      setMovieDetails(details)
    }
    setShowMovieDetails(true)
  }

  const getPageNumbers = (totalPageNum) => {
    let pageNumsList = []
    for (let i = 1; i < totalPageNum + 1; i++) {
      pageNumsList.push(i)
    }
    setPageNumbers(pageNumsList)
  }

  const getNewPage = (event) => {
    addMovie(currentSearch, event.target.id)
  }

  const displayPageNumbers = pageNumbers.map(number => {
    return(
      <li key={number} id={number} className={currentPageNumber == number ? "current-page": ""} onClick={getNewPage}>
        {number}
      </li>
    )
  })

  const getUser = (userSignedIn) => {
    setSignedIn(userSignedIn)
  }

  return (
    <div className="app">
      <SearchMovie addMovie={addMovie} />
      {searchError && <p className="error">Enter a keyword to search</p>}
      <SignIn getUser={getUser}/>
      {signedIn && <p>Sign Out</p>}
      {showHomeScreen ?
        <div id="introduction">
          <p>👋 </p>
          <h1>Welcome! Search for a movie!</h1>
        </div>
        : <></>
      }

      {!showMovieDetails && !showHomeScreen &&
        <>
        <p id="total-results">{totalResults} Found Results For "{currentSearch}"</p>
        <Movies movieData={movieData} getDetails={getDetails} />
        <ul id="pagination">
          {displayPageNumbers}
        </ul>
      </>
      }

      {showMovieDetails && 
        <MoviePage movieDetails={movieDetails} backToMenu={() => setShowMovieDetails(false)}/>
      }
      <Credits />
    </div>
  );
}

export default App;
