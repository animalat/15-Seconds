export const isWebsiteBlocked = (domain, blockedWebsites) => {
    return blockedWebsites.has(domain);
};