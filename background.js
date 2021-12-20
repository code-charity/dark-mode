/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# Global variable
# Storage
    # Get
    # Load
    # On changed
# Tabs
    # Query
    # On created
# Messages
# On installed
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

var extension = {
    active: true,
    storage: {
        items: {}
    }
};








/*--------------------------------------------------------------
# STORAGE
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GET
--------------------------------------------------------------*/

extension.storage.get = function (url) {
    var items = this.items,
        hostname = new URL(url).hostname,
        filters = items.filters || {};

    if (items.power === false) {
        return false;
    }

    if (items.domains && items.domains[hostname] === false) {
        return false;
    }

    if (url.includes('?')) {
        url = url.substring(0, url.lastIndexOf('?'));
    }
    if (url.includes('#')) {
        url = url.substring(0, url.lastIndexOf('#'));
    }

    if (url.startsWith('about:') ||
        url.startsWith('chrome') ||
        url.startsWith('edge') ||
        url.startsWith('https://addons.mozilla.org') ||
        url.startsWith('https://chrome.google.com/webstore') ||
        url.startsWith('https://microsoftedge.microsoft.com/addons') ||
        url.startsWith('moz') ||
        url.startsWith('view-source:') ||
        url.endsWith('.pdf')
    ) {
        return false;
    }

    if (items.schedule === 'sunset_to_sunrise') {
        var start = Number((items.time_from || '00:00').substr(0, 2)),
            end = Number((items.time_to || '00:00').substr(0, 2)),
            current = new Date().getHours();

        if (end < start && current > start && current < 24) {
            end += 24;
        } else if (end < start && current < end) {
            start = 0;
        }

        if (current < start || current > end) {
            return false;
        }
    } else if (items.schedule === 'system_peference') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches === false) {
            return false;
        }
    }

    if (
        items.websites &&
        items.websites[hostname] &&
        items.websites[hostname].filters &&
        items.websites[hostname].filters.global === false
    ) {
        filters = items.websites[hostname].filters;
    }

    return filters['dynamic-theme'];
};


/*--------------------------------------------------------------
# LOAD
--------------------------------------------------------------*/

chrome.storage.local.get(function (items) {
    extension.storage.items = items;
});


/*--------------------------------------------------------------
# ON CHANGED
--------------------------------------------------------------*/

chrome.storage.onChanged.addListener(function (changes) {
    for (var key in changes) {
        extension.storage.items[key] = changes[key].newValue;
    }
});








/*--------------------------------------------------------------
# TABS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# QUERY
--------------------------------------------------------------*/

chrome.tabs.query({}, function (items) {
    //console.log(items);
});


/*--------------------------------------------------------------
# ON CREATED
--------------------------------------------------------------*/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    
});








/*--------------------------------------------------------------
# MESSAGES
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    var action = message.action;

    if (action === 'dark-mode--fetch') {
        var response = await (await fetch(message.url, {
            cache: 'force-cache',
            credentials: 'omit'
        })).text();

        chrome.tabs.sendMessage(sender.tab.id, {
            action: 'dark-mode--fetch-response',
            response: response,
            index: message.index,
            url: message.url
        });
    } else if (action === 'insert-user-agent-stylesheet') {
        if (extension.storage.get(sender.tab.url)) {
            chrome.tabs.insertCSS(sender.tab.id, {
                allFrames: true,
                file: 'user-agent-stylesheet.css'
            });
        }
    } else if (action === 'remove-user-agent-stylesheet') {
        chrome.tabs.removeCSS(sender.tab.id, {
            allFrames: true,
            file: 'user-agent-stylesheet.css'
        });
    } else if (action === 'init') {
        sendResponse({
            url: new URL(sender.tab.url).hostname,
            id: sender.tab.id,
            dynamic_theme: extension.storage.get(sender.tab.url)
        });
    } else if (action === 'dynamic-theme') {
        sendResponse({
            dynamic_theme: extension.storage.get(sender.tab.url)
        });
    }
});








/*--------------------------------------------------------------
# ON INSTALLED
--------------------------------------------------------------*/

/*chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.query({}, function (tabs) {
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