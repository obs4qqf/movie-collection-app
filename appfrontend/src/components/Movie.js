const Movie = ({ movieData }) => {
    const {id, title, image, description} = movieData

    return (
        <div className='movie'>
            <div>Title: {title}</div>
            {
                image !== null && <img src={image} alt={title+' Movie Poster'} width='100' />
            }
            <div>Description: {description}</div>
        </div>
    )
}

export default Movie
