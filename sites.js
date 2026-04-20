
const SITE_RULES = {
  "lefigaro.fr": {
    comments: ["#comments", ".fig-comments", "[data-component='comments']", ".fyre", ".disqus", "#js-fig-comments"],
    ads: [
      ".pub", ".fig-ad", ".fig-ad-content", ".fig-wg-pub", ".fig-advertisement", 
      "[data-ad]", ".trc_rbox_container", ".trc_rbox", "[id^='taboola-']", 
      "a[href*='mediago.io']", "[id^='mediago']", ".fig-wg-pub"
    ],
    recommendations: [".fig-related", ".read-more", ".reco", ".fig-wg-reco"]
  },
  "lemonde.fr": {
    comments: [".comments", "#comments", ".message_moderation"],
    ads: [
      ".ad-container", "[data-ad]", ".ds-home__pub", "[id^='id-google_ads']", 
      "#habillagepub", "#banniere_haute", "#pave_haut", "#inread_top", 
      ".dfp-slot", ".dfp__inread", "[class*='adm-ad']", "[id^='outbrain_']", 
      ".ob-widget", ".ob-dynamic-rec-link"
    ],
    recommendations: [
      ".m-recommendation", ".aside__recommendations", ".services", 
      ".bizdev-list", ".newsletter-article", ".subscription-promo"
    ]
  },
  "liberation.fr": {
    comments: ["#comments", ".comments", "[class*='comment']"],
    ads: [".ad", ".pub", "[data-ad]"],
    recommendations: [".related"]
  },
  "leparisien.fr": {
    comments: ["#comments", ".comments", "[class*='comment']"],
    ads: [".ad-container", ".pub", "[data-ad]"],
    recommendations: [".article-related"]
  },
  "bfmtv.com": {
    comments: [".comments", "#comments", "[class*='comment']"],
    ads: [".pub", "[class*='pub-']", ".ad-container", "[data-ad]"],
    recommendations: [".related"]
  }
};

function getCurrentSiteRules(){
  return Object.keys(SITE_RULES).find(s =>
    location.hostname.includes(s)
  );
}
