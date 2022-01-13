

const Favorites = () => {

    // const retrieveFavorites = async () => {
    //     if (!showFavorites) {
    //         userCurrent.getIdToken().then(async (idToken) => {
    //             const res = await fetch(`/favorites`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': 'Bearer ' + idToken
    //                 }
    //             });
    //             const data = await res.json();
    //             setMovies(data);
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }
    //     getFavorites();
    // }

    return (
        //new
        // <SignIn getFavorites={getFavorites} showFavorites={showFavorites} setMovies={setMovies}/>
        <div>
            {/* {userCurrent != "" && <p onClick={retrieveFavorites}>{showFavorites ? "Close Favorites" : "Get Favorites"}</p>} */}
        </div>
    )
}

export default Favorites
