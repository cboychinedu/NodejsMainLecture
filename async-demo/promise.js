// const p1 = new Promise ((resolve, reject) =>
// {
//     // Running the async work 
//     setTimeout(() =>
//     {
//         // 
//         console.log("Async operation 1...."); 
//         resolve(1); 
//     }, 2000); 
// }); 



const first_promise = new Promise ((resolve, reject) =>
{
    // 
    const cond = false; 
    setTimeout(() =>
    {
        // 
        console.log("Running the first promise!"); 
        if (cond){
            resolve(['file1', 'file2', 'file3']); 
        }
        else {
            reject('Failed!'); 
        }
        
    }, 2000); 
}); 

// Consuming the promise 
first_promise
    .then((result) => { console.log(result) })
    .catch((error) => { console.log(error) })

