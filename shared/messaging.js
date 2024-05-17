const secondsToDisplayMessage = 5;
const div = document.getElementById("infoDiv");

function displayMessage() {
  console.log(`>= ${secondsToDisplayMessage} seconds have passed since last interaction`);

  div.style.color = "white";
  div.style.display = "block";
}

function hideMessage() {
  console.log("message hidden");
  div.style.display = 'none';
}

function intervalFunction() {
  secondsSinceInteraction++;

  if (secondsSinceInteraction === secondsToDisplayMessage) {
    displayMessage();
    return;
  }
}

hideMessage();