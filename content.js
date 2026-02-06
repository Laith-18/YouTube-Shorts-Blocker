(function () {
    "use strict";

    function blockShortsPage() {
        if (location.pathname.startsWith("/shorts")) {
            history.replaceState(null, "", "/");
        }   
            
    }

    function removeShorts() {
        const shortsRenderers = [      
        "ytd-reel-shelf-renderer",
        "ytd-reel-item-renderer",
        "ytd-rich-shelf-renderer",
        "ytd-shorts",
        console.log("Removed Shorts pass"),

        // removes shorts from left sidebar
        document.querySelectorAll("ytd-guide-entry-renderer").forEach(link => {
            if (link.getAttribute("href") === "/shorts") {
                const entry = link.closest("ytd-guide-entry-renderer");
                if (entry) entry.remove();
            }
        })


        ];

        shortsRenderers.forEach(tag => {
            document.querySelectorAll(tag).forEach(el => el.remove());
        });

        document.querySelectorAll("a[href^='/shorts']").forEach(link => {
            const video = link.closest("ytd-grid-video-renderer, ytd-video-renderer, ytd-vertical-list-renderer");
            if (video) video.remove();
        });
    }

    const observer = new MutationObserver(() => {
        blockShortsPage();
        removeShorts();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    })

    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            blockShortsPage();
            removeShorts();
        }
    }, 500);

// Initial run

    blockShortsPage();
    removeShorts(); 
    
    console.log("YouTube Shorts have been blocked.");
        



})();


