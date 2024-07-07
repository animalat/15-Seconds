import { websitesLoadedPromise } from './background.js';
import { getBlockedWebsites } from './storageManager.js';

const blockedWebsitesSection = document.getElementById('blocked-websites');

const showWebsites = (websites) => {
    websites.forEach((website) => {
        const websiteElement = document.createElement('div');
        websiteElement.textContent = website;
        blockedWebsitesSection.appendChild(websiteElement);
    });
}

websitesLoadedPromise.then(() => {
    const blockedWebsites = getBlockedWebsites();
    showWebsites(blockedWebsites);
});