//Spread Operator:

///in array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinedArr = [...arr1, ...arr2];
console.log("Combined array:", combinedArr);

///in object
const obj1 = {
  a: 1,
  b: 2
};

const obj2 = {
  c: 3,
  d: 4
};

const mergedObj = {
  ...obj1,
  ...obj2
};
console.log("Merged object:", mergedObj);

// Copying arrays and objects
const copyArr = [...arr1];

const copyObj = {
  ...obj1
};
console.log("Array copy:", copyArr);
console.log("Object copy:", copyObj);

//Rest Operator:
function sumAll(...nums) {
  let total = 0;
  for (const num of nums) total += num;
  console.log("Total sum:", total);
}
sumAll(1, 2, 3, 4, 5);

///in arrays
const [head, ...tail] = [10, 20, 30, 40];
console.log("Head:", head);
console.log("Tail:", tail);

/// in object
const person = {
  name: "Y",
  age: 25,
  city: "Dhaka",
  country: "Bangladesh"
};

// Extract some properties, collect the rest
const { name, age, ...otherInfo } = person;

console.log("Name:", name);        
console.log("Age:", age);            
console.log("Other Info:", otherInfo); 