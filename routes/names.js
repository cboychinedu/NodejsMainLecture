// Importing the express module 
const express = require('express');  
const router = express.Router(); 

// Creating an array for database purposes 
const namesList = [
    {id: 0, firstName: 'Alan', lastName: 'Smith'}, 
    {id: 1, firstName: 'Mbonu', lastName: 'Chinedum'}, 
    {id: 2, firstName: 'Bradwoods', lastName: 'Josh'}, 
    {id: 3, firstName: 'Rumeny', lastName: 'Jane'}
]; 


// Getting all the information from the database 
router.get('/', (req, res) => 
{
    // 
    res.send(namesList); 
}); 

// Creating another route for gettting names with a given id 
router.get('/:id', (req, res) => 
{
    // Finding names with a given id 
    const NAME = namesList.find(name => name.id === parseInt(req.params.id));
    const firstName = NAME['firstName']; 
    const lastName = NAME['lastName']; 

    const result = {firstName, lastName}; 

    // If the name with the specific id is present
    if (NAME) {res.send(result)} 

    // if the name with the specific id is not present, then send an error status 404 message
    else {res.status(404).send(`Name with ${req.params.id} is not present!`);}
    
}); 

// Creating a post request to store a new name 
router.post('/', (req, res) => 
{
    // Defining a schema 
    const schema = { 
        firstName: Joi.string().min(3).required(), 
        lastName: Joi.string().min(3).required()
    }; 

    // Validating the result 
    const validateResult = Joi.validate(req.body, schema); 
    // console.log(validateResult); 
    // Checking for errors 
    if (validateResult.error) return res.status(400).send(validateResult.error.details[0].message);

    // 
    const NAME = {
        id: namesList.length + 1, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName
    }; 

    // Saving the gotten data into the namesList array 
    namesList.push(NAME); 

    // On success return a response to the user
    res.send(NAME); 
}); 

// 
function validateNames(names) 
{
    // Defining a schema 
    const schema = { 
        firstName: Joi.string().min(3).required(), 
        lastName: Joi.string().min(3).required()
    }; 

    // Validating the result 
    return Joi.validate(names, schema); 
}

// Creating a put request 
router.put('/:id', (req, res) => 
{
    // Finding names with a given id 
    const NAME = namesList.find(name => name.id === parseInt(req.params.id));
    const firstName = NAME['firstName']; 
    const lastName = NAME['lastName']; 

    const fullNames = {firstName, lastName}; 

    // If the name with the specific id is present
    if (NAME) {res.send(fullNames); res.end();} 
    else {res.status(404).send(`Name with ${req.params.id} is not present!`);}
    
    // Validate the names 
    // if invalid, return 400 - Bad request 
    const result = validateNames(req.body); 
    if (result.error) return res.status(400).send(result.error.details[0].message); 
    else {console.log('Successful!')} 

    // Update the names 
    // Return the updated nameslist 
    NAME.firstName = req.body.firstName; 
    res.send(NAME); 
})

// Exporting the router 
module.exports = router; 