const express = require("express");

const app = express();

app.get('/', (req, res) => res.send('Hello World'))

app.get('/api', (req, res) => {
    res.json({ message : "Hello World From Server!"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));