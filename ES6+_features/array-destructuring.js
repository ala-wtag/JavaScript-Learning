const numbers = [10, 20, 30, 40];
const [a, b, , d] = numbers; //skipping the third element
console.log(a); 
console.log(b); 
console.log(d);

const nested = [1, [2, 3], 4];
const [n1, [n2, n3], n4] = nested;
console.log(n1, n2, n3, n4); // 1 2 3 4


