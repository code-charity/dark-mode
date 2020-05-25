/*-----------------------------------------------------------------------------
>>> BACKGROUND
-------------------------------------------------------------------------------
1.0 Storage change listener
2.0 Initialization
3.0 Export
2.0 Google Analytics
-----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------
5.0 STORAGE CHANGE LISTENER
-----------------------------------------------------------------------------*/

chrome.storage.onChanged.addListener(function(changes) {
    _gaq.push(['_trackPageview', '/night-mode-' + chrome.runtime.getManifest().version + '/background', 'page-loaded']);
});


/*-----------------------------------------------------------------------------
6.0 INITIALIZATION
-----------------------------------------------------------------------------*/

chrome.storage.local.get(function(items) {
    _gaq.push(['_trackPageview', '/night-mode-' + chrome.runtime.getManifest().version + '/background', 'page-loaded']);
});

/*-----------------------------------------------------------------------------
3.0 EXPORT
-----------------------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.name === 'download') {
        chrome.permissions.request({
            permissions: ['downloads']
        }, function(granted) {
            if (granted) {
                try {
                    let blob = new Blob([JSON.stringify(request.value)], {
                        type: 'text/plain;charset=utf-8'
                    });

                    chrome.downloads.download({
                        url: URL.createObjectURL(blob),
                        filename: request.filename + '.json',
                        saveAs: true
                    });
                } catch (err) {
                    chrome.runtime.sendMessage({
                        name: 'dialog-error',
                        value: err
                    });
                }
            } else {
                chrome.runtime.sendMessage({
                    name: 'dialog-error',
                    value: 'permissionIsNotGranted'
                });
            }
        });
    }
});


/*-----------------------------------------------------------------------------
2.0 GOOGLE ANALYTICS
-----------------------------------------------------------------------------*/

var _gaq = _gaq || [],
    ga = document.createElement('script'),
    s = document.getElementsByTagName('script')[0];

_gaq.push(['_setAccount', 'UA-88354155-1']);
_gaq.push(['_setSessionCookieTimeout', 14400000]);

ga.type = 'text/javascript';
ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
s.parentNode.insertBefore(ga, s);