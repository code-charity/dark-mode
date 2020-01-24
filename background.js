/*-----------------------------------------------------------------------------
>>> BACKGROUND
-----------------------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);

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