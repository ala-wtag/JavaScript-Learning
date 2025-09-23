function doAsyncWork(callback) {
  console.log("doAsyncWork started");
  setTimeout(function() {
    callback("result");
  }, 1000);
}

doAsyncWork(function(data) {
  console.log("callback received:", data);
});

