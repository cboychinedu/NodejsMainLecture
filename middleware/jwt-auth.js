// Importing the necessary modules 
const jwt = require('jsonwebtoken'); 

// Creating a middleware function 
function ProtectedRoute(req, res, next)
{
    const token = req.header('x-auth-token'); 
    if (!token) { return res.status(401).send('<h4 style="background-color: black; color: white; font-size: 30px; margin-left: 50px;"> Access denied </h4>')}

    token_password = process.env.token_pass;

    // Execute this block of code if the user's token is present
    try {
        const decodedPayload = jwt.decode(token, token_password); 
        req.user = decodedPayload; 

        // Allowing the user to access the route and move on to the 
        // Next execution on the protected route. 
        next(); 
    }

    // Execute this block of code if there was an error in verifying the user's token
    catch (error)
    {
        // Display the error message, and send a status error code "400" 
        console.log(error.message); 
        res.status(400).send(error.message); 
    }
    
}

// Exporting the auth module 
module.exports = ProtectedRoute; 