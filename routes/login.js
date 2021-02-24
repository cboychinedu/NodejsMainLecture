// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 
const { USERS } = require('../models/users');
const { validateLogins } = require('../models/users'); 


// Creating the login home page 
router.get('/', (req, res) =>
{
    // Sending the hme page 
    res.send("<h3> Login home page </h3> "); 
    res.end(); 

}); 

// Creating the login route 
router.post('/', async (req, res) => 
{
    // Performing some validation 
    const result = validateLogins({
        email: req.body.email, 
        password: req.body.password 
    }); 

    // Checking for  validation errors 
    if ( result.error ) return res.status(400).send(result.error.details[0].message); 
    else { console.log( 'Successful on validation!') }

    // look up the email and password if it's present in the database 
    let logins = await USERS
        .find({ email: req.body.email, password: req.body.password })
        .select({ name: 1, email: 1, firstname: 1, lastname: 1 }); 

    // Sending back the verfication 
    res.send(logins); 
    res.end(); 

}); 

// Exporting the login route 
module.exports = router; 


// Creating a function to validate the values for the logins 
// function validateLogins(logins)
// {
//     // Creating a schema using Joi to validate the email and password 
//     const schema = {
//         email: Joi.string().min(3).max(50).required().email(), 
//         password: Joi.string().min(3).max(1024).required() 
//     }

//     // Returning the results for the validation 
//     return Joi.validate(logins, schema); 
// }; 

// Connecting to mongodb database collection of name "Users" 
// const LOGINS = mongodb.model('Customers', loginsSchema); 