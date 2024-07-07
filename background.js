import { getBlockedWebsites } from './storageManager.js';
import { isWebsiteBlocked } from './utils.js';
import { loadBlockedWebsites } from './storageManager.js';

export const websitesLoadedPromise = loadBlockedWebsites();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') {
        return;
    }
    
    if (!tab.url) {
        return;
    }
    
    const urlObj = new URL(tab.url);
    const domain = urlObj.hostname;
    chrome.storage.local.clear();           // ---------remove---------
    await websitesLoadedPromise;
    const blockedWebsites = getBlockedWebsites();

    try {
        const isBlocked = isWebsiteBlocked(domain, blockedWebsites);
        if (isBlocked) {
            chrome.tabs.sendMessage(tabId, {
                message: "BLOCK"
            })
        }
    } catch (error) {
        console.error(`[15s] Error: ${error}`);
    }
});