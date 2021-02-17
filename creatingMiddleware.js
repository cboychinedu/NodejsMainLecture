// Importing the required modules 
const express = require('express'); 
const path = require('path'); 
const Joi = require('joi'); 

// Building the express application 
const app = express(); 

// Using some built in middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('static')); 

// 
app.use(function(req, res, next)
{
    console.log('Logging...'); 
})