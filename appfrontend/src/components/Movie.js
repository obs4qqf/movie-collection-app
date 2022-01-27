import { useNavigate } from "react-router-dom";

const Movie = ({ movieData, queryData={ query: "", page: 0}, favorites=false }) => {
    const {id, title, date, image, description} = movieData;
    const { query, page } = queryData;
    const navigate = useNavigate();

    const getDetails = () => {
        navigate(`/movie/${id}`, {state: {query: query, page: page, favorites: favorites}});
    }

    return (
        <div className='movie'>
            <h3 id='movie-title' onClick={getDetails}><strong>Title:</strong> {title}</h3>
            <h3><strong>Date:</strong> {date}</h3>
            {
                image !== null && <img src={image} alt={title+' Movie Poster'} width='100' />
            }
            {description.length <= 280 ? 
                <p><strong>Description:</strong> {description}</p> :
                <p><strong>Description:</strong> {description.substring(0,280) + '...'}</p>
            }
        </div>
    )
}

export default Movie
