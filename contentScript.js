(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const message = obj.message;

        if (message === "BLOCK") {
            console.log('[15s] Blocking website');

            const overlay = document.createElement('div');
            overlay.setAttribute('style', `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
            `);
            document.body.appendChild(overlay);

            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css?family=Lato&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);

            const countdownBox = document.createElement('div');
            countdownBox.setAttribute('style', `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 20px;
                width: 20px;
                z-index: 10000;
                background-color: white;
                padding: 20px;
                border: 2px solid #C4112F;
                font-size: 24px;
                font-family: 'Lato', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
            `);
            countdownBox.id = 'countdown-box';
            document.body.appendChild(countdownBox);
            
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; 
            // Pause video(s) on the page
            document.querySelectorAll('.html5-main-video').forEach(video => video.pause());

            let timeLeft = 15;              // seconds
            countdownBox.textContent = `${timeLeft}`;

            const countdown = setInterval(() => {
                timeLeft--;
                countdownBox.textContent = `${timeLeft}`;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    document.body.removeChild(countdownBox);
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    document.querySelectorAll('.html5-main-video').forEach(video => video.play());
                }
            }, 1000);
        }
    });
})();