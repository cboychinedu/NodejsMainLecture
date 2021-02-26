// Creating an async and await 
// Creating a function to get repositories 
async function getRepositories(username='None', callback) 
{
    // Setting the timeout for 2000 miliseconds 
    const result = await setTimeout(() =>
    {
        // Execute this block of code after 2000 miliseconds 
        console.log(`Extracted repositories for the user with the username of: ${username}`); 
        
        return (['repo1', 'repo2', 'repo3', 'repo4']); 
    }, 2000); 

    console.log(result); 
}

getRepositories(); 
