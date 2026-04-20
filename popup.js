
document.addEventListener("DOMContentLoaded", () => {
    const cb = document.getElementById("enabled");
    const statsCount = document.getElementById("stats-count");
    const siteStatus = document.getElementById("site-status");
    const resetBtn = document.getElementById("reset-stats");

    // Load enabled state
    chrome.storage.sync.get({ enabled: true }, s => {
        cb.checked = s.enabled;
    });

    // Load stats
    function loadStats() {
        chrome.storage.local.get({ totalRemoved: 0 }, s => {
            statsCount.textContent = s.totalRemoved.toLocaleString();
        });
    }
    loadStats();

    // Check current site status
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url) {
            const url = new URL(tabs[0].url);
            const hostname = url.hostname;
            const isSupported = Object.keys(SITE_RULES).some(s => hostname.includes(s));
            
            if (isSupported) {
                siteStatus.textContent = "Actif sur " + hostname.split('.').slice(-2).join('.');
                siteStatus.style.color = "#4ade80"; // Green color for active
            } else {
                siteStatus.textContent = "Inactif sur ce site";
                siteStatus.style.color = "#94a3b8";
            }
        }
    });

    // Toggle logic
    cb.onchange = () => {
        chrome.storage.sync.set({ enabled: cb.checked });
        // Refresh active tab to apply/remove changes
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    };

    // Reset stats
    resetBtn.onclick = () => {
        if (confirm("Réinitialiser les statistiques ?")) {
            chrome.storage.local.set({ totalRemoved: 0 }, () => {
                loadStats();
            });
        }
    };

    // Update stats dynamically if storage changes
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes.totalRemoved) {
            statsCount.textContent = changes.totalRemoved.newValue.toLocaleString();
        }
    });
});
