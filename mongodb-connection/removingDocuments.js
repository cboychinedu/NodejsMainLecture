// Importing the necessary modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 

// Setting the mongodb URI path 
const databaseURI = "mongodb://localhost/local_user"; 

// Connecting to the mongodb database 
mongodb.connect(databaseURI) 
    .then((result) => { console.log('Connected to the mongodb database.')})
    .catch((error) => { console.log('Could not connect to the mongodb database..')})

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
const COURSE = mongodb.model('Course', courseSchema); 

// 
async function removeCourse(id) 
{
    const result = await COURSE.deleteOne({ "_id": id }); 
    console.log(result); 

}

// Creating a function for removing many courses 
async function removeManyCourses(id) 
{
    // 
    // const result = await COURSE.deleteMany({ "_id": id }); 
    const result = await COURSE.findByIdAndRemove(id); 
    console.log(result); 

}

// 
removeManyCourses('5a68fde3f09ad7646ddec17e'); 