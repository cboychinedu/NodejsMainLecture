// loading the required modules 
const express = require('express'); 
const morgan = require('morgan'); 
const Joi = require('joi'); 
const config = require('config'); 

// loading the necessary Routes 
const names = require('./routes/names'); 
const home = require('./routes/home'); 
const genres = require('./routes/genres'); 

// Creating the express application 
const app = express(); 

// Using the express middleware argument for parsing json object 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 
app.use(morgan('tiny')); 
app.use(express.static('static')); 

// Setting the views 
app.set('view engine', 'pug'); 
app.set('views', './views')  // default 

// Setting the port by checking for the value in the 
// environment variable, and if not present, assign the port number 
// a value of 3000 
const PORT = process.env.PORT || 3000; 

// Setting the routes configurations 
app.use('/', home); 
app.use('/api/names', names);  
app.use('/api/genres', genres); 

// Getting the configuration for the "development" environment 
console.log('Application Name: ' + config.get('name')); 
console.log('Mail Server: ' + config.get('mail.host')); 
console.log('Mail Password: ' + config.get('mail.password')); 

// Displaying the working environment "Development" 
console.log(`app: ${app.get('env')}`); 


// Running the server 
app.listen(PORT, () => 
{
    console.log(`Server running on port ${PORT}`); 
}); 