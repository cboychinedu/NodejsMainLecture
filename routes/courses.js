// Importing the required modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 

// Creating a dict to hold the id and names for courses 
// const courses = [
//     { id: 1, name: 'course1' }, 
//     { id: 2, name: 'course2' }, 
//     { id: 3, name: 'course3' }
// ]; 

// Creating a schema 
const courseSchema = new mongodb.Schema({
    name: { type: String, required: true }, 
    author: String, 
    tags: [String, ], 
    date: { type: Date, default: Date.now }, 
    price: Number, 
    isPublished: Boolean, 
    versionKey: false 
}); 

// Using the collection "courses" with the created courseSchema 
const COURSE = mongodb.model('Courses', courseSchema); 


// Creating a function for validating the course 
function validateCourse(course) 
{
    // Defining a schema 
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema); 
}; 

// Creating a route for sending all the courses 
router.get('/', async (req, res) => 
{
    // If successful, send back all the courses 
    const courses = await COURSE
        .find()
        .select({name: 1, author: 1, tags: 1, price: 1, isPublished: 1 })
    
    // Sending back the courses 
    res.send(courses); 
    res.end(); 
});

// Using HTTP POST request to post data to the list 'courses' (CREATE)
router.post('/', async (req, res) => 
{
    // 
    const result = validateCourse({name: req.body.name});
    // console.log(req.body.name); 
    // console.log(result.error); 

    // Checking for errors 
    if (result.error) return res.status(400).send(result.error.details[0].message); 
    else {console.log('Successful!')}

    // Creating a dict to hold newly created values using POST request 
    let courseObj = new COURSE ({ 
        // id: courses.length + 1,   // Getting the id manually 
        name: req.body.name,       // Getting the name from the post request 
        author: req.body.author, 
        tags: req.body.tags, 
        isPublished: req.body.isPublished
    }); 

    // Pushing the created value to the courses dict 
    courseObj = await courseObj.save(); 

    // Sending back the updated dict to the user for verification 
    res.send(courseObj); 
}); 

// Updating resources (PUT) (UPDATE)
router.put('/:id', async (req, res) => 
{
    // Look up the course 
    // if the course not existing, return error 404 
    // let course = courses.find((c => c.id === parseInt(req.params.id))); 
    let course = await COURSE.findById({"_id": req.params.id})
    
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
router.delete('/:id', async (req, res) => 
{
    // look up the course 
    // let course = courses.find((c => c.id === parseInt(req.params.id))); 
    let course = await COURSE.findById({"_id": req.params.id}); 

    // 
    if (course) { res.send(course); res.end(); }
    else return res.status(404).send(`The course with the given id was not found.`); 

    // Delete the course 
    // const index = courses.indexOf(course)
    // courses.splice(index, 1);
    const result = await COURSE.findByIdAndRemove(req.params.id);  

    // Return the response 
    res.send(result);  
    res.close(); 
})

// Getting parameters firstly (id) before sending back the resource. 
router.get('/:id', async (req, res) => 
{
    // Checking for the courses with the specific given id-pair to see if present. 
    // let course = courses.find((c => c.id === parseInt(req.params.id))); 
    let course = await COURSE.findById({"_id": req.params.id}); 

    // Checking if the course has a value  
    if (course) { res.send(course); res.end(); }
    else return res.status(404).send('The course with the given id was not found.');  
}); 

// Exporting the courses router 
module.exports = router; 
