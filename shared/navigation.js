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

const checkRefreshed = () => {
  //check for Navigation Timing API support
  if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    window.location.href = 'http://127.0.0.1:5500/';
  }
};

getInitialIndex();
checkRefreshed();
