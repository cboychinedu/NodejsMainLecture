// Importing the necessary modules 
const bcrypt = require('bcrypt'); 

// 
let password = '123456'; 
let logins = [
    {
        "email": "lansmithMK@tk.co.uk",
        "password": "12344UUU321"     
    }

]; 

// 
async function run()
{
    const salt = await bcrypt.genSalt(5); 
    hashed_password = await bcrypt.hash(password, salt); 
    
    // Comparing 
    let condition = await bcrypt.compare(password, hashed_password); 
    console.log(salt); 
    console.log(condition); 
    // console.log(hashed_password);  
}; 

run(); 

