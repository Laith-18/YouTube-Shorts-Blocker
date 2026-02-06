(function () { //function wrapper to avoid polluting global scope
    "use strict";

    function blockShortsPage() { //If we're on a Shorts page, redirect to the homepage
        if (location.pathname.startsWith("/shorts")) {
            history.replaceState(null, "", "/");
        }   
            
    }

function removeShorts() {
  //Remove all Shorts shelves /cards
  [
    "ytd-reel-shelf-renderer",
    "ytd-reel-item-renderer",
    "ytd-rich-shelf-renderer"
  ].forEach(tag => { //for each of the tags that can contain Shorts content, remove all instances from the page
    document.querySelectorAll(tag).forEach(el => el.remove()); //remove the element from the page
  });

  //Remove any link pointing to /shorts
  document.querySelectorAll("a[href^='/shorts']").forEach(a => { //for each link that points to /shorts, remove the entire card it belongs to
    const card = a.closest( //find the closest parent card element that contains this link, which could be a video or shelf card
      "ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer" //these are the common card elements that can contain Shorts links
    );
    if (card) card.remove(); //remove the card from the page
  });

  //Remove sidebar Shorts entry
  document
    .querySelectorAll("ytd-guide-entry-renderer, ytd-guide-collapsible-entry-renderer") //these are the sidebar entry elements that can contain the Shorts link
    .forEach(entry => {
      const link = entry.querySelector("a"); //find the link element within the sidebar entry
      const label = entry.innerText?.trim().toLowerCase(); //get the text label of the entry, which can also indicate if it's the Shorts entry

      if (
        (link && link.getAttribute("href") === "/shorts") || //if the link points to /shorts

        label === "shorts"
      ) {
        entry.remove();
      }
    });
}


    const observer = new MutationObserver(() => { //Observe for changes in the DOM, which can indicate navigation or new content being loaded
        blockShortsPage(); //calls the function to block the Shorts page if we're on it
        removeShorts(); //calls the function to remove any Shorts content that may have been loaded dynamically
    });

    observer.observe(document.documentElement, { //Start observing the entire document for changes
        childList: true, //Observe changes to the direct children of the document, which can indicate new content being loaded
        subtree: true //Observe changes to all descendants of the document, which can catch any dynamically loaded Shorts content
    })

    let lastUrl = location.href; //Keep track of the last URL to detect navigation changes that may not trigger DOM mutations, such as history API changes
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            blockShortsPage();
            removeShorts();
        }
    }, 500);

//run

    blockShortsPage();
    removeShorts(); 
    
    console.log("YouTube Shorts have been blocked.");
        



})();


