function greet(name, callback) {
    console.log("Hello " + name);
    callback(); 
}
function sayGoodbye(){
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye); 

//here, sayGoodbye is a callback function executed after greet. 
