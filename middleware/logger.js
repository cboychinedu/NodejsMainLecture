// Creating the url
let url = 'http://mylogger.io/log';

// Creating a function for logging the message
function log(message)
{
  // Send the HTTP request
  console.log(message);
};

//
function greetings(greetings)
{
  console.log('Hello ' + greetings);
}


// Exporting the log function
module.exports.log = log;
module.exports.url = url;
module.exports.greetings = greetings;

// OR
// module.exports = {log, url, greetings}

// Exporting just a single function
// module.exports = greetings;
