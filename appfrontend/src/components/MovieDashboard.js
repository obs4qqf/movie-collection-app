import Movie from './Movie'


const MovieDashboard = () => {
    //all new
    const [searchError, setSearchError] = useState(false)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [pageNumbers, setPageNumbers] = useState([])
  const [totalPages, setTotalPages] = useState(-1)
  const [totalResults, setTotalResults] = useState(-1)
  const [movieData, setMovieData] = useState([])
  const [currentSearch, setCurrentSearch] = useState("")


    //new
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
          // setShowHomeScreen(false)
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

    //new
    const getPageNumbers = (totalPageNum) => {
        let pageNumsList = []
        for (let i = 1; i < totalPageNum + 1; i++) {
          pageNumsList.push(i)
        }
        setPageNumbers(pageNumsList)
      }
    
      //new
      const getNewPage = (event) => {
        addMovie(currentSearch, event.target.id)
      }

    //new
    // const setMovies = (data) => {
    //     setMovieData(data);
    // }

    //new
    const displayPageNumbers = pageNumbers.map(number => {
        return(
          <li key={number} id={number} className={currentPageNumber == number ? "current-page": ""} onClick={getNewPage}>
            {number}
          </li>
        )
      })

    return (
        <>
            <SearchMovie addMovie={addMovie} />
            {searchError && <p className="error">Enter a keyword to search</p>}
            <p id="total-results">{totalResults} Found Results For "{currentSearch}"</p>
            {/* <MovieDashboard movieData={movieData} getDetails={getDetails} /> */}
            <div className='movies-grid'>
                {movieData.map((movie) => <Movie key={movie.id} movieData={movie} getDetails={getDetails}/>)}
            </div>
            <ul id="pagination">
                {displayPageNumbers}
            </ul>
        </>
    )
}

export default MovieDashboard
