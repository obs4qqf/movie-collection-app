import Movie from './Movie'

const MovieDashboard = ({ getDetails, movieData }) => {
    return (
        <div className='movies-grid'>
            {movieData.map((movie) => <Movie key={movie.id} movieData={movie} getDetails={getDetails}/>)}
        </div>
    )
}

export default MovieDashboard
