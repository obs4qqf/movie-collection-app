const MoviePage = ({backToMenu, movieDetails}) => {
    const {title, date, runtime, country, genres, image, description} = movieDetails

    return (
        <div>
            <h3><strong>Title:</strong> {title}</h3>
            <h3><strong>Date:</strong> {date}</h3>
            <h3><strong>Runtime:</strong> {runtime}</h3>
            <h3><strong>Country:</strong> {country}</h3>
            <h3><strong>Genres:</strong> {genres}</h3>
            {
                image !== null && <img src={image} alt={title+' Movie Poster'} width='100' />
            }
            <p><strong>Description:</strong> {description}</p>
            <button onClick={backToMenu}>Back</button>
        </div>
    )
}

export default MoviePage
