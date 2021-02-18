console.log("Before"); 

/* Dealing with asynchronous call backs, and this includes 
* Callbacks 
* Promises 
* Async/await 
*/ 

// 
getUser(); 
console.log("After"); 

// 
function getUser(id) 
{
    setTimeout(() => 
    {
        console.log("Reading a user from a database."); 
        return { id: id, gitHubUsername: "mosh" }; 
    }, 2000); 
}; 