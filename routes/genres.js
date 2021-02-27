// Importing the express and it's router module 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 
const { USERS } = require('../models/users'); 

// Importing the necessary module to protect a specified route 
const auth = require('../middleware/jwt-auth'); 

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
router.get('/protected', auth, async (req, res) => 
{
    // 
    const userLoggedIn = await USERS.findById({"_id": "6036eae1f3be68b5d5d69ddc"}); 

    // Sending back the greetings section 
    console.log(`Hello ${userLoggedIn.firstname}`); 
    res.send("<h3> This route is protected </h3>"); 
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