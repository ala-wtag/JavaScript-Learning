// 1. Create array and add/remove items
let shoppingList = ["milk", "bread", "eggs"];
shoppingList.push("butter");    // add at end
shoppingList.pop();             // remove last
shoppingList.unshift("juice");  // add at start
shoppingList.shift();           // remove first
console.log("Shopping list:", shoppingList);

// 2. Use splice to remove/add elements
shoppingList.splice(1, 1, "tea"); // remove 1 at index 1, add "tea"
console.log("After splice:", shoppingList);

// 3. Use slice to copy portion of array
let breakfastItems = shoppingList.slice(0, 2);
console.log("Breakfast items:", breakfastItems);
