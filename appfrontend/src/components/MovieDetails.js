import { getAuth, getIdToken } from "firebase/auth";
import { useUser } from "./UserContext";

const MovieDetails = ({backToMenu, movieDetails}) => {
    const {title, date, runtime, country, genres, image, description} = movieDetails
    const userCurrent = useUser();

    const favoriteMovie = async () => {
        userCurrent.getIdToken().then(async (idToken) => {
            const res = await fetch(`/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: idToken,
                    title: title,
                    date: date,
                    runtime: runtime,
                    country: country,
                    genres: genres,
                    image: image,
                    description: description
                })
            });
            const data = await res.json();
            console.log(data + "favorited");
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <button onClick={favoriteMovie}>Favorite Movie</button>
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

export default MovieDetails
