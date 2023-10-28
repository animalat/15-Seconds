// Go through all listed websites and check if the current tab is one of them
chrome.tabs.onUpdated.addListener(function(tabId, tab) => {
    if (tab.url && tab.url.includes(...))
    {
        ...
        chrome.tabs.sendMessage(tabId, {
            website: tab.url
        });
    }
}
