//asynchronous with a timer

console.log("A");
    setTimeout(() => console.log("B"), 1000);
    console.log("C");
    

  let count = 0;
let intervalId = setInterval(function() {
    console.log("Repeating message " + count);
    count++;
    if (count === 3) {
        clearInterval(intervalId); // stop after 3 times
    }
}, 1000);   