function fetch(callback) {
    setTimeout(function(){
        console.log("Fetched Data.");
        callback();
    }, 2000);
}

fetch(function(){
    console.log("Processing Data...");
});