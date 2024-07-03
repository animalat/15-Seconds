(() => {
    
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { message, domain } = obj;

        if (message === "BLOCK") {
            console.log(`Blocking ${domain}`);
        } else {
            console.log(`Received unknown message: ${message}`);
        }
    });
})();