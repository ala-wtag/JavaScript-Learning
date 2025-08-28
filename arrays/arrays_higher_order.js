let numbers = [2, 5, 8, 1, 10];

// 1. forEach to print each item
numbers.forEach(num => console.log("Number:", num));

// 2. map to double each number
let doubled = numbers.map(num => num * 2);
console.log("Doubled numbers:", doubled);

// 3. filter numbers greater than 5
let filtered = numbers.filter(num => num > 5);
console.log("Numbers > 5:", filtered);

// 4. reduce to sum all numbers
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of numbers:", sum);