// 1. Create object representing a person
let person = {
    name: "Alice",
    age: 25,
    city: "New York"
};
console.log("Person:", person);

// 2. Access and modify properties
console.log("Name:", person.name);
person.age = 26;
person["city"] = "Boston";
console.log("Updated person:", person);

// 3. Add a method
person.greet = function() {
    console.log("Hello, my name is " + this.name);
};
person.greet();

// Adding new properties
person.country = "USA";
person["hobby"] = "Reading";
console.log("After adding properties:", person);

// Removing property
delete person.hobby;
console.log("After removing hobby:", person);

// Adding methods to a new object
let user = {
    name: "Bob",
    age: 30,
    greet: function() {
        console.log("Hello, my name is " + this.name);
    }
};
user.greet();

// The this keyword in methods
let employee = {
    name: "Eve",
    role: "Engineer",
    introduce: function() {
        console.log("I am " + this.name + " and I am an " + this.role);
    }
};
employee.introduce();

// Loop through object properties
console.log("Looping through person object:");
for (let key in person) {
    console.log(key + ":", person[key]);
}

// Object.entries loop
console.log("Using Object.entries:");
for (let [key, value] of Object.entries(person)) {
    console.log(key + ":", value);
}
