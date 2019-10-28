/*-----------------------------------------------------------------------------
>>> «CHROMIUM STORAGE» MODULE
-----------------------------------------------------------------------------*/

Satus.storage = (function() {
    Satus.on('set', function(name, value) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = {};

        object[path[0]] = Satus.data[path[0]];

        chrome.storage.local.set(object);

        if (chrome && chrome.tabs) {
            chrome.tabs.query({}, function(tabs) {
                for (var i = 0, l = tabs.length; i < l; i++) {
                    if (tabs[i].hasOwnProperty('url')) {
                        chrome.tabs.sendMessage(tabs[i].id, {
                            name: name,
                            value: value
                        });
                    }
                }
            });
        }

        chrome.runtime.sendMessage({
            name: name,
            value: value
        });
    });

    Satus.on('remove', function(name) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = Satus.data;

        for (let i = 0, l = path.length; i < l; i++)
            if (i === l - 1)
                object[path[i]] = null;
            else
                object = object[path[i]];


        chrome.storage.local.set(Satus.data);
    });

    return {
        sync: function(callback) {
            chrome.storage.local.get(function(object) {
                for (let key in object)
                    Satus.set(key, object[key], false);

                callback();
            });
        }
    };
})();