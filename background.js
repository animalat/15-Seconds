// Initialize an empty Set for blockedWebsites
let blockedWebsites = new Set();

// Load blockedWebsites from local storage and convert it to a Set
chrome.storage.local.get('blockedWebsites', (result) => {
    if (result.blockedWebsites) {
        blockedWebsites = new Set(result.blockedWebsites);
    } else {
        // If not set in local storage, initialize it as an empty array
        chrome.storage.local.set({blockedWebsites: ['www.youtube.com', 'www.facebook.com']});
    }
});

const isWebsiteBlocked = (domain) => {
    return blockedWebsites.has(domain);
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') {
        return;
    }
    
    if (!tab.url) {
        return;
    }
    
    const urlObj = new URL(tab.url);
    const domain = urlObj.hostname;
    
    if (isWebsiteBlocked(domain)) {
        chrome.tabs.sendMessage(tabId, {
            message: "BLOCK"
        }).catch((error) => {
            console.error(`[15s] Error: ${error}`);
        });
    }
});
