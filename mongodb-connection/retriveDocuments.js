// Importing the necessary modules 
const { ObjectId } = require('mongodb');
const mongodb = require('mongoose'); 

// Connecting to the mongodb database  
mongodb.connect('mongodb://localhost/local_user')   /* Note the database used here is "local_user" */ 
    .then(() => { console.log('Connected to the mongodb database..')}) 
    .catch(() => { console.log('Could not connect to mongodb database...')}); 

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

// Creating an async function to get the courses from the database 
async function getCourses() 
{
    // Creating an async await class to get all the courses 
    const courses = await COURSE
        .findById({"_id": "5a68fde3f09ad7646ddec17e"}); 

    // Displaying the result 
    console.log(courses); 
}; 

// Creating an async function to get the courses by a specific property 
async function getCourseByProp()
{
    // Creating an async await function to get the courses by author and isPublished 
    const courses = await COURSE
        .find({ author: 'Mosh Lectures', isPublished: true })
        .limit(10) 
        // .sort({ name: 1, author: 1 })
        .select({ name: 1, tags: 1, author: 1 , _id: 1 }); 
    
    // Displaying the result 
    console.log(courses); 
}

/* IMPORTANT OPERANDS */ 
/*  eq  ( equal ) 
*   ne  ( not equal to) 
*   gt  ( greater than )
*   gte ( greater than or equal to ) 
*   lt  ( less than or equal to ) 
*   lte  ( less than or equal to ) 
*   in   ( inside the ) 
*   nin  ( not inside the ) 
*/

// Creating an async function to get the course by using the comparison operator 
async function getCourseByComparison()
{
    // Creating an async await function to get the courses by comparison 
    const courses = await COURSE
        //---  looking for courses with the price greater than 10 
        /* .find({ price: { $gt: 10 } })  */ 

        //---  looking for courses with the price greater than or equal to 10, and less than or equal to 20  
        /* .find({ price: { $gte: 10, $lte: 20 }})  */ 

        //--- looking for courses with the given price range values 
        .find({ price: { $in: [20, 30, 40, 50] } })
        .limit(10)
        .select({ name: 1, tags: 1, author: 1 }); 

    // Displaying the results 
    console.log(courses); 

}

// Executing the function 
getCourses();
// getCourseByProp();  