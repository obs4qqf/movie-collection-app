import { useUser } from "./UserContext";
import { useState, useEffect } from "react";
import Movie from "./Movie";

const Favorites = () => {
    const userCurrent = useUser();
    const [favorites, setFavorites] = useState([]);

    useEffect(async () => {
        await retrieveFavorites();
    }, []);

    const retrieveFavorites = async () => {
        userCurrent.getIdToken().then(async (idToken) => {
            const res = await fetch(`/favorites`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + idToken
                }
            });
            const data = await res.json();
            setFavorites(data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <div className='movies-grid'>
                {favorites.map((favorite) => 
                    <Movie key={favorite.id} movieData={favorite} favorites={true} />
                )}
            </div>
        </div>
    )
}

export default Favorites
