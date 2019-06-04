'use strict';

const showForPages = ['https://steamcommunity.com/sharedfiles/filedetails/*'];

const arkMenu = {
    id: 'arkContextMenu',
    title: 'Copy modlist to clipboard',
    contexts: ['page'],
    documentUrlPatterns: showForPages
};

chrome.contextMenus.create(arkMenu);
chrome.contextMenus.onClicked.addListener(function (info) {
    if (info.menuItemId === 'arkContextMenu') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "modlist"}, function(response) {
                console.log(response);
                document.addEventListener('copy', function(e) {
                    const textToPutOnClipboard = response.ids;
                    e.clipboardData.setData('text/plain', textToPutOnClipboard);
                    e.preventDefault();
                });
                document.execCommand('copy');
            });
        });
    }
});
