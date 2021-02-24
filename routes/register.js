// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 
const USERS = require('../models/users'); 

// Creating a function to validate the value for registration 
function validateRegistration(registration) 
{
    // Creating a schema using joi to validate the firstname, lastname, email and password 
    const schema = {
        firstname: Joi.string().min(2).max(50).required(), 
        lastname: Joi.string().min(2).max(50).required(), 
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(3).max(1024).required()
    }; 

    // Returning the results for the validation 
    return Joi.validate(registration, schema); 
}; 

// Connecting to mongodb database collection of name "Users" 
// const REGISTRATION = mongodb.model('customer-user', registerSchema);   // Data stored into the Users collection 

// Creating the home page for the registration section 
router.get('/', (req, res) => 
{
    // Sending the registration home page 
    res.send('<h3> Registration home page </h3> '); 
    res.end(); 

}); 

// Creating the registration route 
router.post('/', async (req, res) => 
{
    // Performing some validation 
    const result = validateRegistration({
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        email: req.body.email, 
        password: req.body.password 
    }); 

    // Checking for validation errors 
    if ( result.error ) return res.status(400).send(result.error.details[0].message); 
    else { console.log( 'Successful on validation! ' )}; 

    // Saving the new user 
    let register = new USERS({
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        email: req.body.email, 
        password: req.body.password
    }); 

    // Using the try-catch statement to check for errors 
    try 
    {
        let user = await USERS.findOne({ email: req.body.email }); 
        if ( user ) return res.status(400).send('User already registered.'); 

        // else 
        else { let registeredResult = await register.save(); res.send(registeredResult);  }
        // Saving the user values into the mongodb database 
    }
    catch ( err ) 
    {
        // Displaying the error if there was any 
        console.log(err); 
    }

}); 

// Exporting the registeration module 
module.exports = router; 