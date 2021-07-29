const Movie = ({ getDetails, movieData }) => {
    const {id, title, date, image, description} = movieData

    return (
        <div className='movie'>
            <h3 onclick={()=>getDetails(id)}><strong>Title:</strong> {title}</h3>
            <h3><strong>Date:</strong> {date}</h3>
            {
                image !== null && <img src={image} alt={title+' Movie Poster'} width='100' />
            }
            <p><strong>Description:</strong> {description}</p>
        </div>
    )
}

export default Movie
