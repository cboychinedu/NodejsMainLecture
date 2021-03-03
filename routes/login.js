// Importing the required modules 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
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
        // .find({ email: req.body.email, password: req.body.password })
        .findOne({ email: req.body.email })
        .select({ name: 1, email: 1, firstname: 1, lastname: 1, password: 1 }); 

    // If the email is not found 
    console.log(logins); 
    if ( logins === null) { return res.status(400).send('Invalid email or password.'); } 

    // Verifying/validating the password using bcrypt
    // let user_password = String(req.body.password); 
    let user_password = req.body.password; 
    let hashed_password = logins.password; 

    // Comparing the password to see if it's a valid password 
    let validPasswordCondition = await bcrypt.compare(user_password, hashed_password); 
    console.log(validPasswordCondition); 

    // If the password is validate, and the result is true, send back the logins 
    // Getting the password
    if ( !process.env.token_pass )
    {
        // Closing the program if the env variable is not set
        console.log('FATAL ERR: token_pass environment variable is not defined.'); 
        process.exit(1); 
    }

    // If the env variable is set
    else { token_password = process.env.token_pass; }

    // Creating the token using the password
    const token = jwt.sign({"_id": logins._id, "isAdmin": logins.isAdmin }, token_password); 
    // console.log(jwt.decode(token, token_password)); 

    // Sending back a response if the password was validated. 
    if ( validPasswordCondition ) 
    { 
        // Sending the header with the generated token data 
        res.header({'x-auth-token': token, 'X-Powered-By': 'Express',
                     'Keep-Alive': 'timeout=20', 'Content-Type': 'application/json; charset=utf-8'}); 
        res.send(logins);
        res.end(); 
    }

     
    else 
    {
        // if the password is not validated, send back "Invalid email or password"
        let errMessage = JSON.stringify({"message": "Invalid email or password."});
        return res.send(errMessage) 
    }; 


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