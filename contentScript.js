(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        message = obj.message;

        if (message === "BLOCK") {
            console.log('[15s] Blocking website');
        }
    });
})();