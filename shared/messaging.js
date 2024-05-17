const secondsToDisplayMessage = 5;
const div = document.getElementById("infoDiv");
const forwardArrow = document.getElementById("forwardArrowButton");
const backArrow = document.getElementById("backArrowButton");
const pages = ["a", "b", "c"];
let pageIndex;

function getInitialIndex() {
  const href = window.location.href;
  const currentPage = href[href.length - 2];

  switch (currentPage) {
    case "a": {
      pageIndex = 0;
      return;
    }
    case "b": {
      pageIndex = 1;
      return;
    }
    case "c": {
      pageIndex = 2;
      return;
    }
  }
}

forwardArrow.onclick = () => {
  //update page index
  pageIndex++;
  if (pageIndex >= pages.length) pageIndex = 0;

  //get current page
  const currentPage = window.location.href;

  //update page value
  const newPage =
    currentPage.substring(0, currentPage.length - 2) + pages[pageIndex] + "/";

  //navigate
  window.location.href = newPage;
};

backArrow.onclick = () => {
  //update page index
  pageIndex--;
  if (pageIndex < 0) pageIndex = pages.length - 1;

  //get current page
  const currentPage = window.location.href;

  //update page value
  const newPage =
    currentPage.substring(0, currentPage.length - 2) + pages[pageIndex] + "/";

  //navigate
  window.location.href = newPage;
};

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

getInitialIndex();
displayMessage();
