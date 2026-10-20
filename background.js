// Automatically block third-party cookies across the browser
function enforceThirdPartyCookieBlock() {
  chrome.privacy.websites.thirdPartyCookiesAllowed.set(
    {
      value: false,
      scope: 'regular'
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to update cookie setting:", chrome.runtime.lastError);
      } else {
        console.log("Third-party cookies are now blocked by default.");
      }
    }
  );
}

// Run when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  enforceThirdPartyCookieBlock();
});

// Run when the browser profile starts
chrome.runtime.onStartup.addListener(() => {
  enforceThirdPartyCookieBlock();
});
