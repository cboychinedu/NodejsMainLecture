// Importing the necessary modules 
const { ObjectId } = require('mongodb');
const mongodb = require('mongoose'); 

// Setting the mongodb URI path 
const databaseURI = "mongodb://localhost/local_user"; 

// Connecting to the mongodb database  
mongodb.connect(databaseURI)  /* Note that the database used here is the "local_user" */ 
    .then((result) => { console.log('Connected to the mongodb database..') })
    .catch((error) => { console.log('Could not connect to the mongodb database..')}); 

// Creating a schema 
const courseSchema = new mongodb.Schema({
    "_id": String, 
    name: String, 
    author: String, 
    tags: [String, ], 
    date: { type: Date, default: Date.now }, 
    price: Number, 
    isPublished: Boolean, 
    versionKey: false 
}); 

// Converting the created schema into a model 
const COURSE = mongodb.model('Course', courseSchema); 

// Creating a function for updating the courses 
async function updateCourse(id) 
{
    
    // Creating an async await class to get the course by the id 
    const course = await COURSE
        .findById(id); 
 
    console.log(id); 

    // if the course is empty, return a "null" value 
    if ( !course ) return; 

    // Changing the values 
    // course.isPublished = true;  
    // course.author = 'Changed Author'; 

    course.set({
        isPublished: true, 
        name: "Python Course", 
        author: 'Mbonu Chinedu', 
        price: 100.23
    }); 

    // Saving the new changed values 
    const resultOfSavedModifedCourse = await course.save();
    console.log(resultOfSavedModifedCourse);  

}; 

// Running the program 
const idValue = '5a68fde3f09ad7646ddec17e'; 
let userId = new ObjectId(idValue); 

updateCourse(userId); 