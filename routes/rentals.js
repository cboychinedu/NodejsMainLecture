// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 

// Creating a schema for the rentals 
const rentalsSchema = new mongodb.Schema({
    name: { type: String, required: true, min: 2, max: 255 }, 
    author: { type: String, required: true, min: 2, max: 255 },  
    tags: { type: Array}, 
    date: { type: Date, default: Date.now }, 
    isPublished: { type: Boolean }, 
    rentalFee: { type: Number, required: true, min: 0, max: 255 }, 
    versionKey: false 
}); 

// Creating a function to validate the rentals 
function validateRentals(rentals)
{
    // Creating a schema using joi 
    const schema = {
        name: Joi.string().min(2).required(), 
        author: Joi.string().min(2).required() 
    }

    // Returning the result for the validation 
    return Joi.validate(rentals, schema); 
}

// connecting to the collection 'rentals'
const RENTALS = mongodb.model('Rentals', rentalsSchema); 

// Creating a router for sending all the rentals 
router.get('/', async (req, res) => 
{
    // If successful, send back all the rentals 
    const rentals = await RENTALS.find(); 
    res.send(rentals); 
    res.end(); 
}); 

// Creating a post request for posting new rental data to the mongodb server 
router.post('/', async (req, res) => 
{
    // validating the request 
    const result = validateRentals({name: req.body.name }); 

    // Checking for validation errors 
    if (result.error) return res.status(400).send(result.error.details[0].message); 
    else { console.log('Successful on validation!')} 

    // Creating a dict to hold the newly created rentals 
    let rentalObject = new RENTALS({
        name: req.body.name, 
        author: req.body.author, 
        tags: req.body.tags, 
        date: req.body.date, 
        isPublished: req.body.isPublished, 
        rentalFee: req.body.rental_fee 
    }); 

    // Saving the values into the mongodb database  
    rentalObject = await rentalObject.save(); 

    // Sending back the updated rental array 
    res.send(rentalObject); 
}); 

// Exporing the rentals router 
module.exports = router; 