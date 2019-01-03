/*chrome.browserAction.onClicked.addListener(function (tab) {
 // Send a message to the active tab
 chrome.tabs.query({
 active: true,
 currentWindow: true
 }, function (tabs) {
 var activeTab = tabs[0];
 chrome.tabs.sendMessage(activeTab.id, {
 "message": "clicked_browser_action"
 });
 });
 });
 
 // This block is new!
 chrome.runtime.onMessage.addListener(
 function (request, sender, sendResponse) {
 if (request.message === "open_new_tab") {
 chrome.tabs.create({
 "url": request.url
 });
 }
 }
 );*/

var showForPages = [
    "<all_urls>"
];

var contextMenuItem = {
    "id": "enaeblToolbar",
    "title": "Enaebl Toolbar",
    "documentUrlPatterns": showForPages
};

var readerView = {
    "id": "enaeblReaderView",
    "title": "Reader View",
    "documentUrlPatterns": showForPages
};

var tts = {
    "id": "enaeblTTS",
    "title": "Text to Speech",
    "contexts": ["selection"],
    "documentUrlPatterns": showForPages
};

var wikipedia = {
    "id": "enaeblWikipedia",
    "title": "Search on Wikipedia",
    "contexts": ["selection"],
    "documentUrlPatterns": showForPages
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.create(readerView);
chrome.contextMenus.create(tts);
chrome.contextMenus.create(wikipedia);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId === "enaeblToolbar" && clickData.selectionText) {

    }
});

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.msgType === "tts") {
                chrome.tts.speak(request.text, {
                    requiredEventTypes: ['end'],
                    rate: 1,
                    onEvent: function (event) {
                        if (event.type === 'end') {
                        }
                    }
                });
            }
        }
);
