import { getAuth, getIdToken } from "firebase/auth";
import { useUser } from "./UserContext";
import { useState } from "react";

const MovieDetails = () => {
    // const {title, date, runtime, country, genres, image, description} = movieDetails
    const userCurrent = useUser();
    //new
    // const [movieDetails, setMovieDetails] = useState({})
    //new below
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("")
    const [runtime, setRuntime] = useState("")
    const [country, setCountry] = useState("")
    const [genres, setGenres] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

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

    //new
    // const getDetails = async (id) => {
    //     if (movieDetails === {} || movieDetails.id !== id) {
    //       const res = await fetch(`/movie?id=${id}`)
    //       const data = await res.json()
    //       console.log(data)
    
    //       let genreNames = ""
    //       let counter = 1
    //       if (data.genres.length !== 0) {
    //         data.genres.forEach(genre => {
    //           if (counter === 1) {
    //             genreNames = genre.name
    //           } else {
    //             genreNames += (", "+genre.name)
    //           }
    //           counter += 1
    //         })
    //       }
    
    //       const details = {
    //         id: data.id,
    //         title: data.original_title,
    //         date: data.release_date ? data.release_date : "",
    //         runtime: data.runtime ? data.runtime : "",
    //         country: data.production_countries.length !== 0 ? data.production_countries[0].name : "",
    //         genres: data.genres.length !== 0 ? genreNames : "",
    //         image: data.poster_path !== null ? 'https://image.tmdb.org/t/p/original'+data.poster_path : null,
    //         description: data.overview ? data.overview : ""
    //       }
    //       setMovieDetails(details)
    //     }
    //     // setShowMovieDetails(true)
    //   }

    return (
        // new
        // <MovieDetails movieDetails={movieDetails} backToMenu={() => setShowMovieDetails(false)}/>

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
