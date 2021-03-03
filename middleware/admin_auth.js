// Creating a middleware function 
function isAdminVerified(req, res, next)
{
    // 
    if (!req.user.isAdmin)
    {
        // 
        let errMessage = JSON.stringify({"message": "Access denied."}); 
        return res.send(errMessage).status(403); 
    }

    // 
    else 
    {
        // 
        next(); 
    }
}


// Exporting the admin middlware function 
module.exports = isAdminVerified; 