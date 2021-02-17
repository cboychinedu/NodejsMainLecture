// loading the express module 
const express = require('express'); 
const Joi = require('joi'); 

// loading the config module 
const config = require('config'); 

// Building the express object 
const app = express();  

// Setting some parameters and adding the expres.json() middleware 
app.use(express.json()); 
app.use(express.static('static')); 
app.use(express.urlencoded({ extended: true })); 

// Using the environment variable for assigning the PORT value 
const PORT = process.env.PORT || 3000; 

// Creating a dict to hold the id and names for courses 
const courses = [
    { id: 1, name: 'course1' }, 
    { id: 2, name: 'course2' }, 
    { id: 3, name: 'course3' }
]; 

// Creating a function for validating the course 
function validateCourse(course) 
{
    // Defining a schema 
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema); 
}

// Using a GET request (READ)
app.get('/', (req, res) => 
{
    console.log(req.ip); 
    res.send("<h3> Hello World! </h3> "); 
    res.end(); 
}); 

// Creating a route for sending all the courses 
app.get('/api/courses', (req, res) => 
{
    // If successful, send back all the courses 
    res.send(courses); 
    res.end(); 
}); 

// Using HTTP POST request to post data to the list 'courses' (CREATE)
app.post('/api/courses', (req, res) => 
{
    // 
    const result = validateCourse(req.body);
    // console.log(result.error); 

    // Checking for errors 
    if (result.error) return res.status(400).send(result.error.details[0].message); 
    else {console.log('Successful!')}

    // Creating a dict to hold newly created values using POST request 
    const courseObj = { 
        id: courses.length + 1,   // Getting the id manually 
        name: req.body.name       // Getting the name from the post request 
    }; 

    // Pushing the created value to the courses dict 
    courses.push(courseObj); 

    // Sending back the updated dict to the user for verification 
    res.send(courses); 
});

// Updating resources (PUT) (UPDATE)
app.put('/api/courses/:id', (req, res) => 
{
    // Look up the course 
    // if the course not existing, return error 404 
    let course = courses.find((c => c.id === parseInt(req.params.id))); 

    if (course) { res.send(course); res.end(); }
    else return res.status(404).send('The course with the given id was not found.'); 

    // Validate the course 
    // if invalid, return 400 - Bad request 
    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);  
    else {console.log('Successful!')}; 

    // Update the course 
    // Return the updated course 
    course.name = req.body.name; 
    res.send(course); 
}); 

// http DELETE REQUEST 
app.delete('/api/courses/:id', (req, res) => 
{
    // look up the course 
    let course = courses.find((c => c.id === parseInt(req.params.id))); 

    // 
    if (course) { res.send(course); res.end(); }
    else return res.status(404).send(`The course with the given id was not found.`); 

    // Delete the course 
    const index = courses.indexOf(course)
    courses.splice(index, 1); 

    // Return the response 
    res.send(course) 
    res.close(); 
})

// Getting parameters firstly (id) before sending back the resource. 
app.get('/api/courses/:id', (req, res) => 
{
    // Checking for the courses with the specific given id-pair to see if present. 
    let course = courses.find((c => c.id === parseInt(req.params.id))); 

    // Checking if the course does not have a value 
    if (course) { res.send(course); res.end(); }
    else return res.status(404).send('The course with the given id was not found.');  
}); 


// listening on port 3000 
app.listen(PORT, () => 
{
    // Displaying the server message connections 
    console.log(`Listening on port ${PORT}`); 
}); 

