import { updateWebsitesLoadedPromise } from './background.js';

export const chromeStorageGet = (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                resolve(result);
            }
        });
    });
};

export const chromeStorageSet = (data) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(data, () => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                updateWebsitesLoadedPromise();
                chrome.runtime.reload();
                resolve();
            }
        });
    });
};

export const isWebsiteBlocked = (domain, blockedWebsites) => {
    return blockedWebsites.has(domain);
};

export const removeWebsite = async (website, blockedWebsites) => {
    blockedWebsites.delete(website);
    try {
        await chromeStorageSet({blockedWebsites: Array.from(blockedWebsites)});
    } catch (error) {
        console.error(`[15s] Could not remove website: ${error}`);
    }
};

export const addWebsite = async (website, blockedWebsites) => {
    if (blockedWebsites.has(website)) {
        return false;
    }
    blockedWebsites.add(website);
    try {
        await chromeStorageSet({blockedWebsites: Array.from(blockedWebsites)});
    } catch (error) {
        console.error(`[15s] Could not add website: ${error}`);
        return false
    }
    return true;
}