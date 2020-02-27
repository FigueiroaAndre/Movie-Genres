const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const movieGenres = [
    { id: 1, genre: "Horror"},
    { id: 2, genre: "Comedy"}
];

// GET METHODS
// GET ALL
app.get('/api/genres',(req,res) => {
    res.send(movieGenres);
});

// GET ONE
app.get('/api/genres/:id',(req,res) => {
    const genre = movieGenres.find(g => g.id === parseInt(req.params.id) );
    if ( !genre ) return res.status(404).send('404: Genre not found!!!');
    res.send(genre);
});

// POST METHODS
app.post('/api/genres',(req,res) => {
    const { error } = genreValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);
    const newGenre = req.body;
    newGenre.id = movieGenres.length + 1;
    movieGenres.push(newGenre);
    res.send(newGenre);
});

// PUT METHODS
app.put('/api/genres/:id',(req,res)=> {
    const genre = movieGenres.find(g => g.id === parseInt(req.params.id) );
    if ( !genre ) return res.status(404).send('404: Genre not found!!!');
    const { error } = genreValidation(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);
    genre.genre = req.body.genre;
    res.send(genre);
});

// DELETE METHODS
app.delete('/api/genres/:id',(req,res)=> {
    const genre = movieGenres.find(g => g.id === parseInt(req.params.id) );
    if ( !genre ) return res.status(404).send('404: Genre not found!!!');
    genreIndex = movieGenres.indexOf(genre);
    movieGenres.splice(genreIndex,1);
    for (let i = genreIndex; i < movieGenres.length; i++){
        movieGenres[i]["id"] -= 1;
    }
    res.send(genre);
});

// SUPORT METHODS
function genreValidation(genreObject) {
    const schema = {
        genre : Joi.string().min(3).max(50).required()
    };
    return Joi.validate(genreObject,schema);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Listening port ${PORT}...`);