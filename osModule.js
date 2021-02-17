// Loading the logger module
const greetings = require('./logger');

// Loading the path module
const path = require('path');

// Loading the os module
const os = require('os');

// Getting the full information about "app.js" file
let pathObj = path.parse(__filename);
console.log(pathObj.dir);

// Finding some
let totalMemory = os.totalmem();
let freeMemory = os.freemem();

//
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`); 
