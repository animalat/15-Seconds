import { websitesLoadedPromise } from './background.js';
import { getBlockedWebsites } from './storageManager.js';

const blockedWebsitesSection = document.getElementById('blocked-websites');

const showWebsites = (websites) => {
    websites.forEach((website) => {
        const websiteEntry = document.createElement('div');
        websiteEntry.classList.add('website-entry'); // Add a class for styling

        const websiteElement = document.createElement('span'); // Use span for the website name
        websiteElement.textContent = website;
        websiteEntry.appendChild(websiteElement);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        websiteEntry.appendChild(removeButton);

        blockedWebsitesSection.appendChild(websiteEntry);
    });
}

websitesLoadedPromise.then(() => {
    const blockedWebsites = getBlockedWebsites();
    showWebsites(blockedWebsites);
});