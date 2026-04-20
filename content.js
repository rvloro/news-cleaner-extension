
let removedCount = 0;

function rm(sel) {
  sel.forEach(s => {
    document.querySelectorAll(s).forEach(e => {
      e.remove();
      removedCount++;
    });
  });
}

function isAd(el) {
  const c = typeof el.className === 'string' ? el.className : (el.className?.baseVal || "");
  const i = typeof el.id === 'string' ? el.id : "";
  const role = el.getAttribute("role") || "";
  
  const isAdPattern = c.toLowerCase().includes("ad") || 
                      i.toLowerCase().includes("ad") || 
                      role.toLowerCase().includes("ad");
  
  const isProtected = c.includes("header") || 
                      c.includes("media") || 
                      c.includes("reader") ||
                      c.includes("breadcrumb");

  return isAdPattern && !isProtected;
}

function rmAds(sel) {
  sel.forEach(s => {
    document.querySelectorAll(s).forEach(e => {
      if (isAd(e)) {
        e.remove();
        removedCount++;
      }
    });
  });
}

function updateStats() {
  if (removedCount > 0) {
    chrome.storage.local.get({ totalRemoved: 0 }, s => {
      chrome.storage.local.set({ totalRemoved: s.totalRemoved + removedCount });
      removedCount = 0;
    });
  }
}

function clean() {
  const k = getCurrentSiteRules();
  if (!k) return;
  const r = SITE_RULES[k];
  rm(r.comments);
  rmAds(r.ads);
  rm(r.recommendations);
  updateStats();
}

// Debounce function to limit execution frequency
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
}

const debouncedClean = debounce(clean, 250);

chrome.storage.sync.get({ enabled: true }, s => {
  if (!s.enabled) return;
  
  clean(); // Initial clean
  
  const observer = new MutationObserver((mutations) => {
    // Only trigger if nodes were added
    const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
    if (hasNewNodes) {
      debouncedClean();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
});
