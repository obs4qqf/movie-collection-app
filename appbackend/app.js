const express = require("express");
const axios = require("axios")
const app = express();

// app.get('/', (req, res) => res.send('Hello World'))

// app.get('/api', (req, res) => {
//     res.json({ message : "Hello World From Server!"})
// })

app.get('/movie', async (req, res) => {
    const title = req.query.title
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${title}`)
       .then(data => res.json(data))
       .catch(err => console.log(err));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));