import { websitesLoadedPromise } from './background.js';
import { getBlockedWebsites } from './storageManager.js';
import { removeWebsite } from './utils.js'

let blockedWebsites = new Set();

const elementClear = (parentElement) => {
    if (!parentElement) {
        return;
    }

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    parentElement.remove();
}

const removeWebsiteItem = async (websiteEntry, website) => {
    elementClear(websiteEntry);
    websiteEntry.remove();

    if (!website || !blockedWebsites || !blockedWebsites.has(website)) {
        return;
    }
    await websitesLoadedPromise;
    removeWebsite(website, blockedWebsites);
};

const showWebsites = (websites) => {
    const blockedWebsitesSection = document.getElementById('blocked-websites');

    websites.forEach((website) => {
        const websiteEntry = document.createElement('div');
        websiteEntry.classList.add('website-entry'); // Add a class for styling

        const websiteElement = document.createElement('span'); // Use span for the website name
        websiteElement.textContent = website;
        websiteEntry.appendChild(websiteElement);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', async () => {
            await removeWebsiteItem(websiteEntry, website);
        });
        websiteEntry.appendChild(removeButton);

        blockedWebsitesSection.appendChild(websiteEntry);
    });
};

websitesLoadedPromise.then(() => {
    blockedWebsites = getBlockedWebsites();
    showWebsites(blockedWebsites);
});