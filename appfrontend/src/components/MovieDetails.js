import { getIdToken } from "firebase/auth";
import { useUser } from "./UserContext";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const MovieDetails = () => {
    const userCurrent = useUser();
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("")
    const [runtime, setRuntime] = useState("")
    const [country, setCountry] = useState("")
    const [genres, setGenres] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getDetails(params.id);
    }, []);

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
                    description: description,
                    id: id
                })
            });
            const data = await res.json();
            console.log(data + "favorited");
        }).catch(error => {
            console.log(error);
        });
    }

    const getDetails = async (newId) => {
        if (id !== newId) {
          const res = await fetch(`/movie?id=${newId}`)
          const data = await res.json()
          console.log(data)
    
          let genreNames = ""
          let counter = 1
          if (data.genres.length !== 0) {
            data.genres.forEach(genre => {
              if (counter === 1) {
                genreNames = genre.name
              } else {
                genreNames += (", "+genre.name)
              }
              counter += 1
            })
          }
    
          setId(data.id);
          setTitle(data.original_title);
          setDate(data.release_date ? data.release_date : "");
          setRuntime(data.runtime ? data.runtime : "");
          setCountry(data.production_countries.length !== 0 ? data.production_countries[0].name : "");
          setGenres(data.genres.length !== 0 ? genreNames : "");
          setImage(data.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+data.poster_path : null);
          setDescription(data.overview ? data.overview : "");
        }
    }

    const backToMenu = () => {
        const query = location.state.query;
        const page = location.state.page;
        const favorites = location.state.favorites;
        if (favorites) {
            navigate('/account/favorites')
        } else {
            navigate(`/search?query=${query.replace(/\s+/g, '-').toLowerCase()}&page=${page}`)
        }
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
