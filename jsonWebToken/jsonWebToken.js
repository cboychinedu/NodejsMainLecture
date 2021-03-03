// Importing the necessary modules 
const jwt = require('jsonwebtoken'); 


// let fullPrivateKeyFullPath = path.join(__dirname, 'key', 'private.key'); 
// let fullPublicKeyFullPath = path.join(__dirname, 'key', 'public.key'); 

// const privateKEY  = fs.readFileSync(fullPrivateKeyFullPath, 'utf8');
// const publicKEY  = fs.readFileSync(fullPublicKeyFullPath, 'utf8');
let token_password = process.env.token_pass;

// Converting the token into a JSON OBJECT 
let token_value = { "_id": "603fe448be1fbbe831c1827f", "isAdmin": true }; 
let admin_value = { "isAdmin": true }; 

const token = jwt.sign(token_value, token_password);
console.log(token); 
