import { websitesLoadedPromise, awaitWebsitesLoaded } from './background.js';
import { getBlockedWebsites } from './storageManager.js';
import { addWebsite, removeWebsite } from './utils.js'

let blockedWebsites = new Set();
const blockedWebsitesSection = document.getElementById('blocked-websites');

const clearElement = (parentElement) => {
    if (!parentElement) {
        return;
    }

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    parentElement.remove();
}

const addWebsiteItem = async () => {
    console.log('[15s] Adding website');
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
        const currentTab = tabs[0];
        if (!currentTab || !currentTab.url) {
            return;
        }
    
        const url = new URL(currentTab.url);
        const domain = url.hostname;

        if (blockedWebsites.has(domain)) {
            return;
        }

        awaitWebsitesLoaded();
        const result = addWebsite(domain, blockedWebsites);
        console.log('[15s] Result:', result)
        if (result) {
            displayBlockedWebsite(domain);
        }
    });
};

const removeWebsiteItem = async (websiteEntry, website) => {
    console.log('[15s] Removing website');
    clearElement(websiteEntry);
    websiteEntry.remove();

    if (!website || !blockedWebsites || !blockedWebsites.has(website)) {
        return;
    }

    awaitWebsitesLoaded();
    removeWebsite(website, blockedWebsites);
};

const getWebsiteEntry = (website) => {
    return `
        <div class="website-entry">
            <span>${website}</span>
            <button class="remove-btn">x</button>
        </div>
    `;
};

const displayBlockedWebsite = (website) => {
    const websiteEntryHTML = getWebsiteEntry(website);

    const template = document.createElement('template');
    template.innerHTML = websiteEntryHTML.trim();

    const websiteEntry = template.content.firstChild;

    blockedWebsitesSection.appendChild(websiteEntry);

    const removeButton = websiteEntry.querySelector('.remove-btn');
    removeButton.addEventListener('click', async () => {
        const website = removeButton.closest('.website-entry').querySelector('span').textContent;
        try {
            await removeWebsiteItem(websiteEntry, website);
        } catch (error) {
            console.error(`[15s] Could not remove website: ${error}`);
        }
    });
};

const displayBlockedWebsites = (websites) => {
    blockedWebsitesSection.innerHTML = '';

    websites.forEach((website) => {
        displayBlockedWebsite(website);
    });
};
document.addEventListener('DOMContentLoaded', () => {
    websitesLoadedPromise.then(() => {
        blockedWebsites = getBlockedWebsites();
        displayBlockedWebsites(blockedWebsites);
    });

    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', async () => {
        try {
            await addWebsiteItem();
        } catch (error) {
            console.error(`[15s] Could not add website: ${error}`);
        }
    });
});
