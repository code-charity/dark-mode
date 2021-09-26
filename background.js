/*---------------------------------------------------------------
>>> BACKGROUND
-----------------------------------------------------------------
# On installed
# Message listener
---------------------------------------------------------------*/

/*---------------------------------------------------------------
# ON INSTALLED
---------------------------------------------------------------*/

/*chrome.runtime.onInstalled.addListener(function() {
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

            if (!url.startsWith('about:') &&
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
});*/


/*---------------------------------------------------------------
# MESSAGE LISTENER
---------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (typeof message !== 'object') {
        return false;
    }

    if (message.action === 'get-tab-url') {
        sendResponse({
            url: new URL(sender.tab.url).hostname,
            id: sender.tab.id
        });
    } else if (message.action === 'dark-mode--active') {
        chrome.browserAction.setIcon({
            path: 'assets/icons/48.png',
            tabId: sender.tab.id
        });
    } else if (message.action === 'dark-mode--fetch') {
        var response = await (await fetch(message.url, {
            cache: 'force-cache',
            credentials: 'omit'
        })).text();

        chrome.tabs.sendMessage(sender.tab.id, {
            action: 'dark-mode--fetch-response',
            response: response,
            parent: message.parent,
            url: message.url
        });
    } else if (message.action === 'insert-user-agent-stylesheet') {
        chrome.tabs.insertCSS(sender.tab.id, {
            file: 'user-agent-stylesheet.css'
        });
    } else if (message.action === 'remove-user-agent-stylesheet') {
        chrome.tabs.removeCSS(sender.tab.id, {
            file: 'user-agent-stylesheet.css'
        });
    }
});