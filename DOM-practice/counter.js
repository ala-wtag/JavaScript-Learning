
var counterBox = document.getElementById("counterBox"); 
var alertMsg = document.getElementById("alertMsg");     
var increaseBtn = document.getElementById("increaseBtn");
var decreaseBtn = document.getElementById("decreaseBtn");
var resetBtn = document.getElementById("resetBtn");
var doubleBtn = document.getElementById("doubleBtn");

var count = 0;

function updateCounter() {
  counterBox.textContent = count; 
  alertMsg.textContent = "";      
  if(count > 10 || count < 0){
    counterBox.style.backgroundColor = "yellow"; // flash
    setTimeout(updateCounter, 500);              // revert back after 0.5s
}

  if(count > 0 && count <= 5){
    counterBox.style.backgroundColor = "lightgreen";
  } else if(count > 5 && count <= 10){
    counterBox.style.backgroundColor = "orange";
  } else if(count > 10){
    counterBox.style.backgroundColor = "red";
    alertMsg.textContent = "Your count has exceeded 10!";
  } else if(count < 0){
    counterBox.style.backgroundColor = "lightcoral";
    alertMsg.textContent = "Count is negative!";
  } else{
    counterBox.style.backgroundColor = "white";
  }
}

// Increase count
increaseBtn.addEventListener("click", function() {
  count++;
  updateCounter();
});

// Decrease count
decreaseBtn.addEventListener("click", function() {
  count--;
  updateCounter();
});

// Double count
doubleBtn.addEventListener("click", function(){
    count=count*2;
    updateCounter();
})
// Reset count
resetBtn.addEventListener("click", function() {
  count = 0;
  updateCounter();
});

// Initialize display
updateCounter();
