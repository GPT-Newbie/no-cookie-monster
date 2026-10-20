# No Cookie Monster! 🍪🚫

A lightweight Chrome extension (Manifest V3) that removes intrusive cookie consent dialogs, blocks tracking network requests, and automatically disables third-party cookies.

---

## Features

* **DOM Removal**: Suppresses and removes Google Funding Choices (`.fc-consent-root`) dialogs, backdrops, and restores page scrolling.
* **Network Blocking**: Blocks requests and cookie exchanges to tracking domains like `intergient.com` using `declarativeNetRequest`.
* **Privacy Enforcement**: Disables third-party cookies by default using Chrome's Privacy API.

---

## Project Structure

```text
no-cookie-monster/
├── manifest.json        # Extension configuration and permissions
├── rules.css            # Instant CSS suppression to stop visual flicker
├── content.js           # Real-time DOM observer to purge consent elements
├── network_rules.json   # Network blocking and cookie-stripping rules
├── background.js        # Service worker enforcing browser privacy settings
└── icon.png             # Extension toolbar icon
