console.log("script start");

setTimeout(function() {
  console.log("timeout callback");
}, 0);

Promise.resolve().then(function() {
  console.log("promise then 1");
}).then(function() {
  console.log("promise then 2");
});

queueMicrotask(function() {
  console.log("queueMicrotask");
});

console.log("script end");
