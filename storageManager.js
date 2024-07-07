let blockedWebsites = new Set();

const chromeStorageGet = (key) => {
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

const chromeStorageSet = (data) => {
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

const loadBlockedWebsites = async () => {
    try {
        const result = await chromeStorageGet('blockedWebsites');

        if (result.blockedWebsites) {
            blockedWebsites = new Set(result.blockedWebsites);
        } else {
            // If not set in local storage, initialize it with default values
            await chromeStorageSet({blockedWebsites: ['www.youtube.com', 'www.facebook.com', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']});
            blockedWebsites = new Set(['www.youtube.com', 'www.facebook.com', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']);
        }
    } catch (error) {
        console.error(`[15s] Error loading blocked websites: ${error}`);
    }
    
};

const getBlockedWebsites = () => blockedWebsites;

export { loadBlockedWebsites, getBlockedWebsites };