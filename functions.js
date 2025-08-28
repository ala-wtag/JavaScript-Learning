// 1. Function to calculate the area of a rectangle
function rectangleArea(length, width) {
    return length * width;
}
console.log("Rectangle area:", rectangleArea(5, 10));

// 2. Functions to perform basic arithmetic operations
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b !== 0) return a / b;
    else return "Cannot divide by zero";
}
console.log("Add:", add(5, 3));
console.log("Subtract:", subtract(5, 3));
console.log("Multiply:", multiply(5, 3));
console.log("Divide:", divide(5, 0));

// 3. Regular function converted to arrow function
const square = (n) => n * n;
console.log("Square of 6:", square(6));

// Example of higher-order function (1st class function)
function operate(a, b, operation) {
    return operation(a, b);
}
console.log("Operate add:", operate(4, 5, add));
console.log("Operate multiply:", operate(4, 5, multiply));
