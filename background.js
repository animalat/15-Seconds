const blockedWebsites = ['www.youtube.com', 'www.facebook.com'];

const isWebsiteBlocked = (domain) => {
    console.log(domain);
    console.log(blockedWebsites.includes(domain));
    return blockedWebsites.includes(domain);
};

// Go through list of websites in preferences, if current tab is one of them, send a message to content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') {
        return;
    }
    console.log("1");
    if (!tab.url) {
        return;
    }
    console.log("2");
    
    const urlObj = new URL(tab.url);
    const domain = urlObj.hostname;

    if (isWebsiteBlocked(domain)) {
        console.log("3");
        chrome.tabs.sendMessage(tabId, {
            message: "BLOCK",
            domain: domain
        }).catch((error) => {
            console.error(`Could not send message: ${error}`);
        });
    }
});
