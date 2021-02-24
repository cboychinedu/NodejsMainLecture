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

// Connecting to the mongodb database collection of name 'Users' 
const USERS = mongodb.model('Users', UserSchema); 

// Exporing the module 
module.exports = USERS; 