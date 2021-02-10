// Importing the os module
const os = require('os');

// Importing the file system module
const fs = require('fs');

// Getting the files present in the current working directory using sync method
const files = fs.readdirSync('$');
console.log(files);

// Getting the file present in the current working directory using non-async process
fs.readdir('./', (err, files) =>
{
    if (err) console.log('Error', err);
    else console.log('Result', files);

}); 
