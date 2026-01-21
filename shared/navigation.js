const pages = ["a"];

function getCurrentPage() {
  const href = window.location.href;
  return href[href.length - 2];
}

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

const goToPage = (letter) => {

  console.log("go to page request", letter);

  if(!pages.includes(letter)) return;
  if(letter === getCurrentPage()) return;
  //get current page
  const currentPage = window.location.href;

  //update page value
  const newPage =
    currentPage.substring(0, currentPage.length - 2) + letter + "/";

  //navigate
  window.location.href = newPage;
}

checkRefreshed();
