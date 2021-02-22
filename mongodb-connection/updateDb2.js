// Importing the necessary modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 

// Setting the URI path for the mongodb database  
const databaseURI = "mongodb://localhost/local_user";  

// Connecting to the mongodb database  
mongodb.connect(databaseURI)    /* Note that the database used here is the "local_user" */ 
    .then((result) => { console.log('Connected to the mongodb database..')}) 
    .catch((error) => { console.log('Could not connect to the mongodb database.')}); 

// Creating a schema 
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
const COURSE = mongodb.model('Course', courseSchema) 

// Creating a function to find and update the course by id 
async function updateCourse(id) 
{
    // 
    const course = await COURSE.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason', 
            isPublished: false
        }
    }, {new: true}); 

    // Displaying the updated data 
    console.log(course); 
}; 

// Running the function  
const idValue = '5a68fde3f09ad7646ddec17e';
updateCourse(idValue); 

