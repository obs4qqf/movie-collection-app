import { useState, useEffect } from 'react';
import Movie from './Movie';
import SearchMovie from './SearchMovie';
import { useNavigate, useSearchParams } from "react-router-dom";

const MovieDashboard = () => {
    const [searchError, setSearchError] = useState(false);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [totalPages, setTotalPages] = useState(-1);
    const [totalResults, setTotalResults] = useState(-1);
    const [movieData, setMovieData] = useState([]);
    const [currentSearch, setCurrentSearch] = useState("");
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (searchParams.get("query")) {
        const newQuery = searchParams.get("query").replace(/\-+/g, ' ');
        addMovie(newQuery, searchParams.get("page"));
        console.log("inside loop");
      }
    }, []);

    const navigateSearch = (movie, page = 1) => {
      navigate(`/search?query=${movie.replace(/\s+/g, '-').toLowerCase()}&page=${page}`);
      addMovie(movie, page);
    }

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

    const getPageNumbers = (totalPageNum) => {
        let pageNumsList = []
        for (let i = 1; i < totalPageNum + 1; i++) {
          pageNumsList.push(i)
        }
        setPageNumbers(pageNumsList)
    }

    const getNewPage = (event) => {
        navigateSearch(currentSearch, event.target.id)
    }

    const displayPageNumbers = pageNumbers.map(number => {
        return(
          <li key={number} id={number} className={currentPageNumber == number ? "current-page": ""} onClick={getNewPage}>
            {number}
          </li>
        )
    })

    return (
        <>
            <SearchMovie navigateSearch={navigateSearch} />
            {searchError && <p className="error">Enter a keyword to search</p>}
            <p id="total-results">{totalResults} Found Results For "{currentSearch}"</p>
            <div className='movies-grid'>
                {movieData.map((movie) => 
                  <Movie key={movie.id} movieData={movie} queryData={{query: currentSearch, page: currentPageNumber}} />
                )}
            </div>
            <ul id="pagination">
                {displayPageNumbers}
            </ul>
        </>
    )
}

export default MovieDashboard
