import { getBlockedWebsites } from './storageManager.js';
import { isWebsiteBlocked } from './utils.js';
import { loadBlockedWebsites } from './storageManager.js';

export let websitesLoadedPromise = loadBlockedWebsites();

export const updateWebsitesLoadedPromise = () => {
    websitesLoadedPromise = loadBlockedWebsites();
};

export const awaitWebsitesLoaded = async () => {
    try {
        await websitesLoadedPromise;
    } catch (error) {
        console.error(`[15s] Error loading websites: ${error}`);
    }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') {
        return;
    }
    
    if (!tab.url) {
        return;
    }
    
    const urlObj = new URL(tab.url);
    const domain = urlObj.hostname;

    awaitWebsitesLoaded();
    const blockedWebsites = getBlockedWebsites();
    console.log('[15s] Blocked websites:', blockedWebsites)
    try {
        const isBlocked = isWebsiteBlocked(domain, blockedWebsites);
        if (isBlocked) {
            console.log('[15s] Tab updated');
            chrome.tabs.sendMessage(tabId, {
                message: "BLOCK"
            });
        }
    } catch (error) {
        console.error(`[15s] Could not block: ${error}`);
    }
});