// Importing the necessary modules 
const mongodb = require('mongoose'); 

// Connecting to the database  
mongodb.connect('mongodb://localhost/local_user') 
    .then((result) => { console.log('Connected to the mongodb datebase..') })
    .catch((error) => { console.log(error) }); 

// Creating a new schema 
const courseSchema = new mongodb.Schema({
    "_id": String, 
    name: { type: String, required: true }, 
    author: String, 
    tags: [String, ], 
    date: { type: Date, default: Date.now }, 
    price: Number, 
    isPublished: Boolean, 
    versionKey: false 
}); 

// Converting the created schema into a model 
const COURSE = mongodb.model('Course', courseSchema); 

// Creating an async function to get the courses from the database  
async function getCourses() 
{
    // Creating an async await class to get all the courses 
    return await COURSE
        .find({ isPublished: true, tags: { $in: ['backend']}})
        .sort({ name: 1, author: 1 });  

}; 

// Creating an async function to get all the published frontend and backend courses 
// sorted by their price in a decending order, and extract only their name and author. 
async function getPublished()
{
    // Creating an async await class to get the required courses 
    return await COURSE
        .find({ isPublished: true, tags: {$in: ['backend', 'frontend'] }})

        // Getting the values by their price in a decending order 
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1}); 
}; 

// Creating an async function to get all the published courses that are $15 or more, 
// or have the word "by" in their name. 
async function getPublishedByTitle()
{
    // Creating an async await class to get the required courses 
    return await COURSE
        .find({ isPublished: true })
        .or([

            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])

        .select({ name: 1, author: 1, price: 1}); 

}; 


// Creating a function to run the program 
async function run()
{
    // const courses = await getCourses(); 
    // const courses = await getPublished(); 
    const courses = await getPublishedByTitle(); 
    console.log(courses); 
}

// Running the program 
run(); 
