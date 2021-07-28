import Movie from './Movie'

const Movies = ({ movieData }) => {
    return (
        <div className='movies-grid'>
            {movieData.map((movie) => <Movie key={movie.id} movieData={movie} />)}
        </div>
    )
}

export default Movies
