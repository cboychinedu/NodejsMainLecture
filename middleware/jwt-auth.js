// Importing the necessary modules
const jwt = require('jsonwebtoken');

// Creating a middleware function
function ProtectedRoute(req, res, next)
{
    const token = req.header('x-auth-token');
    let errMessage = JSON.stringify({"message": "Access denied"}); 
    if (!token) { return res.send(errMessage)}

    let token_password = process.env.token_pass;

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
        let errMessage = JSON.stringify({"message": error.message});
        res.send(errMessage).status(400);
    }

}

// Exporting the auth module
module.exports = ProtectedRoute;
