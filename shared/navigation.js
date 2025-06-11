const CANVAS_RATIO = 1;

function getCurrentPage() {
  const currentURL = window.location.href;
  const currentPage = currentURL.substring(
    currentURL.length - 2,
    currentURL.length - 1
  );
  return currentPage;
}

function showPage(page) {
  //update page value
  const currentURL = window.location.href;
  const localhostURL = currentURL.substring(0, currentURL.length - 2);
  const newPage = localhostURL + page + "/";

  //navigate
  window.location.href = newPage;
}

function showA() {
  const currentPage = getCurrentPage();
  if (currentPage === "a") return;

  //update page value
  showPage("a");
}

function showB() {
  const currentPage = getCurrentPage();
  if (currentPage === "b") return;

  showPage("b");
}

/**
 * If this page has been open from a refresh, go back to main index.html
 */
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

checkRefreshed();
