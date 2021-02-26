// Working with callback function 
console.log("Before"); 

// 
getRepositories('cboychinedu', (returnedValue) => 
{
    // console.log(`The repos are: ${returnedValue}`);
    console.log(returnedValue);  
}); 


// 
console.log('After');  

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
