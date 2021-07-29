import Movie from './Movie'

const Movies = ({ getDetails, movieData }) => {
    return (
        <div className='movies-grid'>
            {movieData.map((movie) => <Movie key={movie.id} movieData={movie} getDetails={getDetails}/>)}
        </div>
    )
}

export default Movies
