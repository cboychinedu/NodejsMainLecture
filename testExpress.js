// loading the express module 
const express = require('express'); 
const morgan = require('morgan'); 
const app = express(); 

// loading the name router module 
const names = require('./routes/names'); 

// loading the home page router module 
const home = require('./routes/home'); 

// loading the joi module 
const Joi = require('joi'); 

// loading the config module 
const config = require('config');

// Setting the port by checking for the value in the 
// environment variable, and if not present, assign the port number 
// a value of 3000 
const PORT = process.env.PORT || 3000; 

// Using the express middleware argument for parsing json object 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 
app.use(morgan('tiny')); 
app.use(express.static('static')); 

// Any requested route with the name "/api/names" return back 
// the router present in the names modules. 
app.use('/api/names', names); 

// Any request route with the name "/" return back the 
// home page router 
app.use('/', home); 

// Setting the views 
app.set('view engine', 'pug'); 
app.set('views', './views')  // default 

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