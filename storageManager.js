import { chromeStorageGet, chromeStorageSet } from './utils.js';

let blockedWebsites = new Set();

const loadBlockedWebsites = async () => {
    try {
        const result = await chromeStorageGet('blockedWebsites');

        if (result.blockedWebsites) {
            blockedWebsites = new Set(result.blockedWebsites);
        } else {
            // If not set in local storage, initialize it with default values
            await chromeStorageSet({blockedWebsites: []});
            blockedWebsites = new Set([]);
        }
    } catch (error) {
        console.error(`[15s] Error loading blocked websites: ${error}`);
    }
};

const getBlockedWebsites = () => blockedWebsites;

export { loadBlockedWebsites, getBlockedWebsites };