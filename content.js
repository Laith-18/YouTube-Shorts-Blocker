if (location.pathname.startsWith("/shorts")) {
    window.location.replace("/");
}

function removeShorts() {
    const selectors = [
        "ytd-reel-shelf-renderer",
        "ytd-reel-item-renderer",
        "a[href^='/shorts/']",];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            el.remove();
        });
    });
}
const observer = new MutationObserver(() => {
    removeShorts();
});

observer.observe(document.document, {
    childList: true,
    subtree: true
});

removeShorts();