const express = require("express");
const axios = require("axios")
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.get('/movie', async (req, res) => {
    const title = req.query.title
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${title}`)
       .then(answer => {
           res.json(answer.data)
       })
       .catch(err => console.log(err.response));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));