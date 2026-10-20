const CONSENT_SELECTORS = [
  '.fc-consent-root',
  '.fc-dialog-overlay',
  '.fc-dialog-container',
  'div[class*="fc-consent"]'
];

function unlockViewportScroll() {
  const targets = [document.documentElement, document.body];
  targets.forEach((element) => {
    if (!element) return;

    // Reset inline overflow locks
    if (element.style.overflow === 'hidden' || element.style.getPropertyPriority('overflow') === 'important') {
      element.style.removeProperty('overflow');
    }

    // Reset fixed-position lock patterns
    if (element.style.position === 'fixed') {
      element.style.removeProperty('position');
    }

    // Remove common vendor scroll-prevention classes
    element.classList.remove('fc-no-scroll', 'fc-scroll-lock', 'no-scroll');
  });
}

function removeConsentElements(root = document) {
  let removedAny = false;

  CONSENT_SELECTORS.forEach((selector) => {
    const nodes = root.querySelectorAll ? root.querySelectorAll(selector) : [];
    nodes.forEach((node) => {
      node.remove();
      removedAny = true;
    });

    if (root.matches && root.matches(selector)) {
      root.remove();
      removedAny = true;
    }
  });

  if (removedAny || document.querySelector('.fc-consent-root')) {
    unlockViewportScroll();
  }
}

// 1. Initial cleanup
removeConsentElements();

// 2. Real-time DOM observation to remove dynamically mounted CMP instances
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        removeConsentElements(node);
      }
    }
  }
});

function init() {
  const mountPoint = document.documentElement || document.body;
  if (mountPoint) {
    removeConsentElements();
    observer.observe(mountPoint, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      removeConsentElements();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}

init();