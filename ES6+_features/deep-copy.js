//deep copy using structured cloning
let person1={
    name: "X",
    address:{
        city: "Dhaka",
    }
};

let person2=structuredClone(person1); //deep copy
person2.address.city="Rajshahi";
console.log(person1.address.city);
console.log(person2.address.city);
console.log(person1);
console.log(person2);

//deep copy using JSON methods
let copy=JSON.parse(JSON.stringify(person1));
copy.address.city="Chittagong";
console.log(person1.address.city);
console.log(copy.address.city);
console.log(person1);
console.log(copy);