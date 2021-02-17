// Importing the express and it's router module 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 

// Using the express json middleware 
router.use(express.json()); 

// 
const genres = [
    {id: 1, name: 'Action' }, 
    {id: 2, name: 'Horror' }, 
    {id: 3, name: 'Romance' }
]; 

//  
router.get('/', (req, res) =>
{
    // Sending back the genres 
    res.send(genres); 
}); 

// Greetings 
router.get('/greetings', (req, res) => 
{
    // Sending back the greetings section 
    res.send("<h3> Genres Greetings Section! </h3>"); 
}); 

// 
router.post('/', (req, res) => 
{
    // 
    const { error } = validateGenre(req.body); 

    // Checking for errors 
    if (error) return (res.status(400).send(error.details[0].message)); 

    // 
    const genre = {
        id: genres.length + 1, 
        name: req.body.name 
    }; 

    // 
    genres.push(genre); 
    res.send(genre); 

}); 

// Exporting the genres route 
module.exports = router; 