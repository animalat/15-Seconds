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
    await chromeStorageSet({blockedWebsites: Array.from(blockedWebsites)});
};