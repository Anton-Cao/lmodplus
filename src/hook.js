

(function() {
  const tabStorage = {};
  const networkFilters = {
      urls: [
        "*://learning-modules.mit.edu/class/*",
        "*://learning-modules.mit.edu/portal/*",
        "*://learning-modules.mit.edu/materials/*"
      ]
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setIsOld") {
        localStorage.setItem("old", request.old);
    }
  });

  chrome.webRequest.onBeforeRequest.addListener((details) => {
    let r = false;
    const old = localStorage.getItem("old");

    if (old == undefined) r = true;
    else if (old == "false") r = true;
    else if (old == "true") r = false;

    if (r) {
        return ({redirectUrl: chrome.extension.getURL("src/html/main.html")});
    }
  }, networkFilters, ['blocking']);
}());