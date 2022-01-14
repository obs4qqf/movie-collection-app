const express = require("express");
const axios = require("axios")
const app = express();
const database = require('./firebase').database;
const auth = require('./firebase').auth;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use(express.json());

app.get('/movie', async (req, res) => {
    const {title, page, id} = req.query
    if (title !== undefined) {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${title}&page=${page}`)
        .then(answer => {
            res.json(answer.data)
        })
        .catch(err => console.log(err.response));
    }
    if (id !== undefined) {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_KEY}`)
        .then(answer => res.json(answer.data))
        .catch(err => console.log(err.response))
    }
});

app.get('/favorites', async (req, res) => {
    auth.verifyIdToken(req.headers.authorization.substring(7)).then(decodedToken => {
        const uid = decodedToken.uid;
        database.collection('favorites').where('uid', '==', uid).get().then(snapshot => {
            const movies = [];
            snapshot.forEach(doc => {
                movies.push({...doc.data(), id: doc.id})
            });
            res.json(movies);
        });
    }).catch(error => console.log(error));
})

app.post('/favorites', async (req, res) => {
    const {token, title, date, runtime, country, genres, image, description} = req.body;
    auth.verifyIdToken(token).then(decodedToken => {
        const uid = decodedToken.uid;
        database.collection('favorites').add({
            uid: uid,
            title: title,
            date: date,
            runtime: runtime,
            country: country,
            genres: genres,
            image: image,
            description: description
        })
        res.json(title);
    }).catch(error => console.log(error));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));