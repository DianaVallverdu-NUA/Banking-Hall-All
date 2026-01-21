const messagingOFF = true;
const secondsToDisplayMessage = 16;
const div = document.getElementById("infoDiv");

function displayMessage() {
  if (messagingOFF) return;
  div.classList.remove("dissolve-out");
  div.classList.add("dissolve-in");
}

function hideMessage() {
  if (messagingOFF) return;
  div.classList.remove("dissolve-in");
  div.classList.add("dissolve-out");
}

function intervalFunction() {
  if (messagingOFF) return;
  secondsSinceInteraction++;
}

if (!messagingOFF) displayMessage();
