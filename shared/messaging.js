const secondsToDisplayMessage = 20;
const div = document.getElementById("infoDiv");

function displayMessage() {
  div.classList.remove("dissolve-out");
  div.classList.add("dissolve-in");
}

function hideMessage() {
  div.classList.remove("dissolve-in");
  div.classList.add("dissolve-out");
}

function intervalFunction() {
  secondsSinceInteraction++;
}

displayMessage();
