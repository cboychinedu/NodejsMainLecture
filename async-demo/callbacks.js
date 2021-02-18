// Working with callback function 
console.log("Before"); 

// Getting the returned value for the user 
getUser(1, (user) => 
{
    console.log('User', user); 
}); 

// 
getRepositories('cboychinedu', (returnedValue) => 
{
    console.log(`The repos are: ${returnedValue}`); 
})

// 
console.log('After');  

// Creating a function for returning a value after 2000 miliseconds 
function getUser(id, callback)
{
    // Setting the timeout for 2000 miliseconds 
    setTimeout(() => 
    {
        // Execute this block of code after 2000 miliseconds 
        console.log('Reading a user from a database...'); 
        callback({ id: id, gitHubUsername: 'mosh' }); 
    }, 2000); 
}

// Creating a function to get repositories 
function getRepositories(username, callback) 
{
    // Setting the timeout for 2000 miliseconds 
    setTimeout(() =>
    {
        // Execute this block of code after 2000 miliseconds 
        console.log(`Extracted repositories for the user with the username of: ${username}`); 
        callback (['repo1', 'repo2', 'repo3', 'repo4']); 
    }, 2000); 
}
