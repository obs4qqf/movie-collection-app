const express = require("express");
const axios = require("axios")
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// app.get('/', (req, res) => res.send('Hello World'))

// app.get('/api', (req, res) => {
//     res.json({ message : "Hello World From Server!"})
// })

app.get('/movie', async (req, res) => {
    const title = req.query.title
    console.log(title)
    // axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_KEY}`)
    //     .then(answer => {
    //         console.log(answer.data)
    //         res.json({msg: 'Code went through'})
    //     })
    //     .catch(err => console.log(err));
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${title}`)
       .then(answer => {
           res.json(answer.data)
       })
       .catch(err => console.log(err));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));