const CANVAS_RATIO = 1;
const pages = ["a", "b"];

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

const previousPage = () => {
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

const nextPage = () => {
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

const showA = () => {
  const currentURL = window.location.href;
  const localhostURL = currentURL.substring(0, currentURL.length - 2);

  const currentPage = currentURL.substring(currentURL.length - 2, currentURL.length - 1);
  if(currentPage === 'a') return;

  //update page value
  const newPage = localhostURL + "a" + "/";

  console.log(localhostURL);
  // return;

  //navigate
  window.location.href = newPage;

  // update current page
  currentPage = pageA;
};

const showB = () => {
  const currentURL = window.location.href;
  const localhostURL = currentURL.substring(0, currentURL.length - 2);

  console.log(localhostURL);
  // return;

  //update page value
  const newPage = localhostURL + "b" + "/";

  const currentPage = currentURL.substring(currentURL.length - 2, currentURL.length - 1);
  if(currentPage === 'b') return;

  //navigate
  window.location.href = newPage;

  // update current page
  currentPage = pageB;
};

const checkRefreshed = () => {
  //check for Navigation Timing API support
  if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    const href = window.location.href;
    const mainPage = href.substring(0, href.length - 2);
    window.location.href = mainPage;
  }
};

getInitialIndex();
checkRefreshed();
