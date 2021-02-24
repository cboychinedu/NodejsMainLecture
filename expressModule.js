// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const morgan = require('morgan'); 
const config = require('config'); 

// Creating a connection to the mongodb database 
// Setting the path to the database URI 
databaseURI = "mongodb://localhost/local_user"; 

// Connecting 
mongodb.connect(databaseURI) 
    .then(() => { console.log('Connected to mongodb...')}) 
    .catch((err) => { console.log('Could not connect to mongodb...')}); 


// Importing the required routes 
const courses = require('./routes/courses'); 
const rentals = require('./routes/rentals'); 

// Building the express object 
const app = express();  

// Setting some parameters and adding the expres.json() middleware 
app.use(express.json()); 
app.use(express.static('static')); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny')); 

// Using the environment variable for assigning the PORT value 
const PORT = process.env.PORT || 3000; 

// Setting the routes configurations 
app.use('/api/courses', courses); 
app.use('/api/rentals', rentals); 

// Getting the configurations for the 'development' environment 
console.log('Application Name: ' + config.get('name')); 
console.log('Mail Server: ' + config.get('mail.host'));  
console.log('Mail Password: ' + config.get('mail.password')); 
console.log(`Application Environment: ${app.get('env')}`)

// Using a GET request (READ)
app.get('/', (req, res) => 
{
    console.log(req.ip); 
    res.send("<h3> Hello World! </h3> "); 
    res.end(); 
}); 

// listening on port 3000 
app.listen(PORT, () => 
{
    // Displaying the server message connections 
    console.log(`Listening on port ${PORT}`); 
}); 

