// Importing the emitter module
const EventEmitter = require('events');

// Creating the event emitter object
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (event) =>
{
  console.log('Listener Called!');
  console.log(`Event: ${event.url}`);

});

// Raise the created event 'messageLogged'
// emitter.emit('messageLogged', {url: 'http://', id: 20 });


// Creating a logging event
const logger = require('./logger');

// Register a listener for the logging event
emitter.on('LoggingEvent', (event) =>
{
    //
    logger.log('The logging event has been called!');
});

// Raise the created logging event
emitter.emit('LoggingEvent', {});
