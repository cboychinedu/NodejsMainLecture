// Importing the express module 
const express = require('express'); 
const router = express.Router(); 

// Setting the routes for the home page 
// Creating the first route 
router.get('/', (req, res) =>
{
    // Sending the home page 
    res.send("<h2> Home page section </h2>"); 
})

// Exporting the home page router 
module.exports = router; 