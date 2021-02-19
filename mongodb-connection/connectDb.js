// Importing the necessary modules 
const mongodb = require('mongoose');

// Connecting 
mongodb.connect('mongodb://localhost/local_user')
    .then(() => {console.log('Connected to mongodb...')}) 
    .catch((err) => { console.log('Could not connect to mongodb...')}); 

// Creating a schema  
const courseSchema = new mongodb.Schema({
    name: String, 
    author: String, 
    tags: [String ],
    date: { type: Date, default: Date.now }, 
    isPublished: Boolean 

}); 

// Converting the created schema into a model 
const COURSE = mongodb.model('Course', courseSchema); 

// Creating an async function to connect to the mongodb database and save the 
// necessary information. 
async function createCourse()
{
    // Creating an object from the created model/class 
    const course = new COURSE({
        name: "Nodejs Course", 
        author: "Mosh Lectures", 
        tags: ["node", "backend"], 
        isPublished: true 
    }); 

    // Saving the couse into the database  
    const result = await course.save(); 
    console.log(result); 

}

// Running the function 
createCourse(); 