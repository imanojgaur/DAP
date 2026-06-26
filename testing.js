const myPointer = new Promise( (resolve, reject) => {
    // const data = setTimeout(()=>5+4,50000);
    const data = 4+5;

    // if (data.ok) resolve(`Success ${data}`);
    if(data) resolve(`Success ${data}`)
    else reject("Failed!");
    console.log("I am prineted from promise");
});

console.log(myPointer.then((message)=>console.log(message)),"this is an arror");
console.log(myPointer);
console.log("I don't know why the upper messages arent printing on", myPointer);
console.log(typeof(myPointer));
// console.log(typeof(myPointer()));