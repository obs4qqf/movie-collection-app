const Movie = ({ movieData }) => {
    const {id, title, genre, description} = movieData

    return (
        <div>
            <div>Title: {title}</div>
            <div>Genre: {genre}</div>
            <div>Description: {description}</div>
        </div>
    )
}

export default Movie
