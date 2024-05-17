const secondsToDisplayMessage = 5;
const div = document.getElementById("infoDiv");

function displayMessage() {
  div.classList.remove("dissolve-out");
  div.classList.add("dissolve-in");

  setTimeout(() => hideMessage(), 15000);
}

function hideMessage() {
  div.classList.remove("dissolve-in");
  div.classList.add("dissolve-out");
}

function intervalFunction() {
  secondsSinceInteraction++;
}

displayMessage();
