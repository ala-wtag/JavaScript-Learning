const person = {
  name: "A",
  age: 35,
  city: "Dhaka"
};

const {
  name,
  age,
  city
} = person;

console.log(name); 
console.log(age);  
console.log(city); 

// Nested object destructuring
const user = {
  id: 1,
  profile: {
    username: "fyfj123",
    email: "test@example.com"
  }
};

const {
  profile: {
    username,
    email
  }
} = user;

console.log(username); 
console.log(email);    

// Function parameter destructuring with object
function printPerson({
  name,
  age
}) {
  console.log("Name:", name);
  console.log("Age:", age);
}

printPerson({
  name: "B",
  age: 30
});

// Default values in destructuring
const {
  name: personName = "Unknown",
  age: personAge = 0,
  country = "Unknown"
} = {
  name: "C",
  age: 28
};

console.log(personName); 
console.log(personAge);  
console.log(country);   