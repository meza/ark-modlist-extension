'use strict';
const getModlist = function () {
    const urls = [];
    const ids = [];
    const mapper = function(item) {urls.push(item.getAttribute("href"))};
    const list = document.querySelectorAll(".collectionItemDetails > a[href]");
    [].forEach.call(list, mapper);
    urls.forEach(function(url) {
        const u = new URL(url);
        ids.push(u.searchParams.get("id"));
    });
    return ids.join(',')
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "modlist") {
            sendResponse({ids: getModlist()});
        }
    });