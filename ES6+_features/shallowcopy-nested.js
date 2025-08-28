//equating objects directly - points to the same object in memory.

const person_1 = {
    name: "Harry",
    age: 24,
};
const person_2 = person_1;
console.log(person_2); 

const person_3 = { name: "Alice", age: 25 };
const person_4 = person_1;
console.log(person_3.age); 
person_4.age = 30;
console.log(person_4.age); 

//copying using spread operator
const person_5 = { name: "A", age: 24 };

const person_6 = { ...person_5 };

person_6.age = 30;

console.log(person_5.age);
console.log(person_6.age); 

let obj1={
    name: "Adhara",
};
let obj2=obj1;
obj2.name="Sirius";
console.log(obj1.name);

//This is shallow copy, reference is copied (for objects/arrays) and values are copied (for primitives).
//A new variable points to the same object in memory.

let arr1=[1,2,3];
let arr2=arr1;
arr2.push(4);
console.log(arr1);  
console.log(arr2);     //both arr1 and arr2 reflect the change

//To create a new array, we can use the spread operator
//The spread operator (...) ALSO createas a shallow copy of arrays and objects. 
// This is safer than =, but still shallow (nested objects remain linked).

let arr3=[1,2,3];
let arr4=[...arr3];  //creates a new array
arr4.push(4);
console.log(arr3);  
console.log(arr4);    //arr3 remains unchanged

//object copy with apread
let obj3={name:"X", age:20};
let obj4={...obj3};
obj4.age=25;
console.log(obj3.age);
console.log(obj4.age);

//nested objects/arrays remain linked
let detail1={
    name: "X",
    address: {
        city: "Dhaka",
        country: "Bangladesh"
    }
};

let detail2={
    ...detail1
};

detail2.address.city = "Rajshahi";

console.log(detail1.address.city); //still changed because address is a nested object (shallow copy)
console.log(detail2.address.city); 
//both the original and copied object reflect the change in the nested object

