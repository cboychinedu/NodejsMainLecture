// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 

// Creating a schema for the user's data 
const UserSchema = new mongodb.Schema({
    firstname: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    lastname: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    email: { type: String, unique: true, minlength: 2, maxlength: 50, required: true }, 
    password: { type: String, required: true, minlength: 3, maxlength: 1024 }, 
    versionKey: false 
}); 

// Creating a function for validating registration 
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

// Creating a function for validating logins 
function validateLogins(logins) 
{
    // Creating a schema using joi to validate the email and password 
    const schema = { 
        email: Joi.string().min(3).max(50).required().email(), 
        password: Joi.string().min(3).max(1024).required() 
    }

    // Returning the results for the validation 
    return Joi.validate(logins, schema); 
}

// Connecting to the mongodb database collection of name 'Users' 
const USERS = mongodb.model('Users', UserSchema); 

// Exporing the module 
module.exports.USERS = USERS; 
module.exports.validateLogins = validateLogins; 
module.exports.validateRegistration = validateRegistration; 