(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        message = obj.message;

        if (message === "BLOCK") {
            console.log('[15s] Blocking website');
        } else {
            console.error(`[15s] Received unknown message: ${message}`);
        }
    });
})();