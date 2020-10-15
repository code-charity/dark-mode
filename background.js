/*---------------------------------------------------------------
>>> BACKGROUND
-----------------------------------------------------------------
1.0 Google Analytics
2.0 Storage change listener
3.0 On installed
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 GOOGLE ANALYTICS
---------------------------------------------------------------*/

var _gaq = [];

(function() {
    var ga = document.createElement('script'),
        s = document.getElementsByTagName('script')[0];

    _gaq.push(['_setAccount', 'UA-88354155-1']);
    _gaq.push(['_setSessionCookieTimeout', 14400000]);

    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    s.parentNode.insertBefore(ga, s);
})();

_gaq.push(['_trackPageview', '/night-mode-' + chrome.runtime.getManifest().version, 'page-loaded']);


/*---------------------------------------------------------------
2.0 STORAGE CHANGE LISTENER
---------------------------------------------------------------*/

chrome.storage.onChanged.addListener(function(changes) {
    _gaq.push(['_trackPageview', '/night-mode-' + chrome.runtime.getManifest().version, 'page-loaded']);
});


/*---------------------------------------------------------------
3.0 ON INSTALLED
---------------------------------------------------------------*/

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0, l = tabs.length; i < l; i++) {
            var tab = tabs[i],
                url = tab.url;

            if (url.includes('?')) {
                url = url.substring(0, url.lastIndexOf('?'));
            }
            if (url.includes('#')) {
                url = url.substring(0, url.lastIndexOf('#'));
            }

            if (
                !url.startsWith('about:') &&
                !url.startsWith('chrome') &&
                !url.startsWith('edge') &&
                !url.startsWith('https://addons.mozilla.org') &&
                !url.startsWith('https://chrome.google.com/webstore') &&
                !url.startsWith('https://microsoftedge.microsoft.com/addons') &&
                !url.startsWith('moz') &&
                !url.startsWith('view-source:') &&
                !url.endsWith('.pdf')
            ) {
                chrome.tabs.executeScript(tab.id, {
                    file: 'content-scripts.js'
                });
            }
        }
    });
});
