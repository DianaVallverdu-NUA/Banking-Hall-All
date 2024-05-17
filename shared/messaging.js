const secondsToDisplayMessage = 5;
const div = document.getElementById("infoDiv");
const forwardArrow = document.getElementById("forwardArrow");
const backArrow = document.getElementById("backArrow");

forwardArrow.onclick = () => {
  const href = window.location.href;
  const currentPage = href[href.length - 2];

  switch (currentPage) {
    case "a": {
      //go to b
      return;
    }
    case "b": {
      //go to c
      return;
    }
    case "c": {
      //go to a
      return;
    }
  }
};

backArrow.onclick = () => {
  const href = window.location.href;
  const currentPage = href[href.length - 2];

  switch (currentPage) {
    case "a": {
      //go to c
      return;
    }
    case "b": {
      //go to a
      return;
    }
    case "c": {
      //go to b
      return;
    }
  }
};

function displayMessage() {
  console.log(
    `>= ${secondsToDisplayMessage} seconds have passed since last interaction`
  );

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
  console.log(secondsSinceInteraction);
}

displayMessage();
