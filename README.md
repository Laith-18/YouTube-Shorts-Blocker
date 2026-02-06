# YouTube-Shorts-Blocker
Firefox extension that blocks YouTube Shorts.

## Features

- Redirects any attempt to open a Shorts page to the YouTube homepage.
- Removes all Shorts shelves, cards, and links from the main feed.
- Cleans up sidebar entries related to Shorts.
- Works dynamically, blocking Shorts even as new content loads.

## How It Works

The extension uses a content script (`content.js`) that:

- Observes changes in the YouTube DOM to remove Shorts content as it appears.
- Redirects `/shorts` URLs to the homepage.
- Removes all elements and links related to Shorts from the feed and sidebar.

## Permissions

- Access to `*://www.youtube.com/*` is required to block and remove Shorts content.

## Development

- All logic is contained in `content.js`.
- The extension is defined in `manifest.json`.

## Credits

Created by Laith Hanson

---

No Shorts! - Lock in.