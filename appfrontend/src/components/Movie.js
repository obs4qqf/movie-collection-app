const Movie = ({ movieData }) => {
    const {id, title, date, image, description} = movieData

    return (
        <div className='movie'>
            <div><strong>Title:</strong> {title}</div>
            <div><strong>Date:</strong> {date}</div>
            {
                image !== null && <img src={image} alt={title+' Movie Poster'} width='100' />
            }
            <div><strong>Description:</strong> {description}</div>
        </div>
    )
}

export default Movie
