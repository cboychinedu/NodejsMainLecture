// Importing the necessary modules 
const jwt = require('jsonwebtoken'); 


// Creating a middleware function 
function isAdminVerified(req, res, next)
{
    // 
    const isAdmin = req.headers.isadmin; 
    console.log(req.headers.isadmin); 

    // 
    if (isAdmin) 
    {
        // 
        next(); 
    }

    // 
    else 
    {
        // 
        let errMessage = JSON.stringify({"message": "Access denied. (User not admin)"}); 
        return res.send(errMessage).status(403); 
    }
}


// Exporting the admin middlware function 
module.exports = isAdminVerified; 