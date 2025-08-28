//pass by value(primitive)
function change(x){
    x=20;
}
let num=10;
change(num);
console.log(num); //10 (unchanged)

//pass by reference(object/array)
function update(user){
    user.name="Bob";
}
let person={
    name:"Alice",
};
update(person);
console.log(person.name); //Bob (changed)
//In JavaScript, primitive types (numbers, strings, booleans, null, undefined, symbols...) are passed by value; Objects (including arrays and functions) are passed by reference.
//When you pass an object to a function, you're passing a reference to that object, not the actual object itself.

//copying inside function
function safeUpdate(user){
    let copy = {
        ...user
    }
    copy.name="Charlie";
    return copy;
};