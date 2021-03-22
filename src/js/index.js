/*---------------------------------------------------------------
>>> TABLE OF CONTENTS:
-----------------------------------------------------------------
1.0 
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 
---------------------------------------------------------------*/
var HOSTNAME;

function updateWebsites() {
    Menu.main.section.filters.tabs.current.label = HOSTNAME.length > 12 ? HOSTNAME.substring(0, 12) + '...' : HOSTNAME;
    Menu.main.section.filters.tabs.current.section.use_global.storage_key = 'websites/' + HOSTNAME + '/filters/use_global';
    Menu.main.section.filters.tabs.current.section.invert_colors.storage_key = 'websites/' + HOSTNAME + '/filters/invert_colors';
    Menu.main.section.filters.tabs.current.section.bluelight.section.bluelight.storage_key = 'websites/' + HOSTNAME + '/filters/bluelight';
    Menu.main.section.filters.tabs.current.section.brightness.storage_key = 'websites/' + HOSTNAME + '/filters/brightness';
    Menu.main.section.filters.tabs.current.section.contrast.storage_key = 'websites/' + HOSTNAME + '/filters/contrast';
    Menu.main.section.filters.tabs.current.section.grayscale.storage_key = 'websites/' + HOSTNAME + '/filters/grayscale';

    Menu.main.section.styles.tabs.current.label = HOSTNAME.length > 12 ? HOSTNAME.substring(0, 12) + '...' : HOSTNAME;

    document.body.dataset.websiteTextEditor = satus.storage.get('websiteTextEditor');

    var websites = satus.storage.get('websites') || {},
        text = '',
        count = 0;

    Menu.main.section.websites.section = {
        type: 'section',
        variant: 'card',
        class: 'websites-list'
    };

    for (var key in websites) {
        if (key !== '') {
            count++;

            text += key + ': ' + (satus.storage.get('websites/' + key + '/enabled') || true) +
                '\n    invert_colors: ' + (satus.storage.get('websites/' + key + '/filters/invert_colors') || true) +
                '\n    bluelight: ' + (satus.storage.get('websites/' + key + '/filters/bluelight') || 0) +
                '\n    brightness: ' + (satus.storage.get('websites/' + key + '/filters/brightness') || 100) +
                '\n    contrast: ' + (satus.storage.get('websites/' + key + '/filters/contrast') || 100) +
                '\n    grayscale: ' + (satus.storage.get('websites/' + key + '/filters/grayscale') || 0) + '\n\n';

            Menu.main.section.websites.section[key] = {
                type: 'section',

                button: {
                    type: 'button',
                    label: key,

                    section: {
                        type: 'section',
                        variant: 'card',

                        filters: {
                            type: 'button',
                            label: 'filters',
                            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

                            section: {
                                type: 'section',
                                variant: 'card',

                                invert_colors: {
                                    label: 'invertColors',
                                    type: 'switch',
                                    value: true,
                                    storage_key: 'websites/' + key + '/filters/invert_colors'
                                },
                                bluelight: {
                                    type: 'button',
                                    label: 'bluelight',

                                    section: {
                                        type: 'section',
                                        variant: 'card',

                                        bluelight: {
                                            type: 'slider',
                                            label: 'colorTemperature',
                                            max: 90,
                                            storage_key: 'websites/' + key + '/filters/bluelight'
                                        }
                                    }
                                },
                                brightness: {
                                    label: 'brightness',
                                    type: 'slider',
                                    max: 100,
                                    value: 100,
                                    storage_key: 'websites/' + key + '/filters/brightness'
                                },
                                contrast: {
                                    label: 'contrast',
                                    type: 'slider',
                                    max: 100,
                                    value: 100,
                                    storage_key: 'websites/' + key + '/filters/contrast'
                                },
                                grayscale: {
                                    label: 'grayscale',
                                    type: 'slider',
                                    max: 100,
                                    storage_key: 'websites/' + key + '/filters/grayscale'
                                }
                            }
                        },
                        styles: {
                            type: 'button',
                            label: 'styles',
                            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></svg>',

                            textfield: {
                                type: 'text-field',
                                placeholder: 'html, body { ... }',
                                style: {
                                    margin: '16px',
                                    height: 'calc(100vh - 96px)',
                                    fontFamily: 'monospace'
                                },
                                rows: 6,
                                storage_key: 'websites/' + key + '/styles',
                                onrender: function(object) {
                                    this.dataset.storageKey = object.storage_key;
                                    this.value = satus.storage.get(object.storage_key) || '';
                                },
                                oninput: function() {
                                    satus.storage.set(this.dataset.storageKey, this.value);
                                }
                            }
                        }
                    }
                },
                enabled: {
                    type: 'switch',
                    storage_key: 'websites/' + key + '/enabled'
                }
            };
        }
    }

    if (count === 0) {
        Menu.main.section.websites.section.message = {
            type: 'text',
            label: 'theListIsEmpty',
            style: {
                'display': 'block',
                'text-align': 'center',
                'margin': '32px 0'
            }
        };
    } else {
        Menu.main.section.websites.textfield.value = text;
    }

    satus.render(Menu, document.querySelector('.satus__wrapper'));
}

function init(url, access) {
    url = new URL(url);

    HOSTNAME = url.hostname;

    satus.storage.import(function() {
        var language = satus.storage.get('language') || 'en';

        if (!satus.isset(satus.storage.get('mode')) || satus.storage.get('mode') === true) {
            document.querySelector('.satus').classList.add('dark');
        }

        document.documentElement.dataset.hideMadeWithLove = satus.storage.get('hide_made_with_love');

        satus.locale.import(language, function() {
            satus.updateStorageKeys(Menu, function() {
                if (location.href.indexOf('action=import') !== -1) {
                    importData();
                } else if (location.href.indexOf('action=export') !== -1) {
                    exportData();
                } else {
                    if (access === false) {
                        Menu.main.toolbar.enable.type = 'text';
                        delete Menu.main.toolbar.enable.onrender;
                        delete Menu.main.toolbar.enable.onclick;
                        Menu.main.toolbar.enable.label = satus.locale.getMessage('thePageHOSTNAMEisProtectedByBrowser').replace('HOSTNAME', '"' + HOSTNAME + '"');
                        Menu.main.toolbar.enable.value = '';
                        Menu.main.toolbar.enable.style = {
                            lineHeight: '20px'
                        };
                    } else {
                        Menu.main.toolbar.enable.label = HOSTNAME;
                        Menu.main.toolbar.enable.storage_key = 'websites/' + HOSTNAME + '/enabled';
                    }

                    updateWebsites();
                }
            });
        });
    });
}

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    var tab = tabs[0],
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
        init(url, true);
    } else {
        init(url, false);
    }
});


function importData() {
    satus.render({
        type: 'dialog',

        select_file: {
            type: 'button',
            label: 'selectFile',
            onclick: function() {
                var input = document.createElement('input');

                input.type = 'file';

                input.addEventListener('change', function() {
                    var file_reader = new FileReader();

                    file_reader.onload = function() {
                        var data = JSON.parse(this.result);

                        for (var key in data) {
                            satus.storage.set(key, data[key]);
                        }

                        if (location.href.indexOf('action=import') !== -1) {
                            window.close();
                        } else {
                            document.querySelector('.satus-dialog__scrim').click();

                            satus.render({
                                type: 'dialog',

                                message: {
                                    type: 'text',
                                    label: 'dataImportedSuccessfully'
                                },
                                section: {
                                    type: 'section',
                                    class: 'controls',

                                    ok: {
                                        type: 'button',
                                        label: 'ok',
                                        onclick: function() {
                                            document.querySelector('.satus-dialog__scrim').click();
                                        }
                                    }
                                }
                            }, document.body);
                        }
                    };

                    file_reader.readAsText(this.files[0]);
                });

                input.click();
            }
        }
    });
}

function exportData() {
    var blob = new Blob([JSON.stringify(satus.storage.data)], {
        type: 'application/json;charset=utf-8'
    });

    satus.render({
        type: 'dialog',

        export: {
            type: 'button',
            label: 'export',
            onclick: function() {
                chrome.permissions.request({
                    permissions: ['downloads']
                }, function(granted) {
                    if (granted) {
                        chrome.downloads.download({
                            url: URL.createObjectURL(blob),
                            filename: 'dark-mode.json',
                            saveAs: true
                        }, function() {
                            setTimeout(function() {
                                if (location.href.indexOf('action=export') !== -1) {
                                    window.close();
                                } else {
                                    document.querySelector('.satus-dialog__scrim').click();

                                    satus.render({
                                        type: 'dialog',

                                        message: {
                                            type: 'text',
                                            label: 'dataExportedSuccessfully'
                                        },
                                        section: {
                                            type: 'section',
                                            class: 'controls',

                                            ok: {
                                                type: 'button',
                                                label: 'ok',
                                                onclick: function() {
                                                    document.querySelector('.satus-dialog__scrim').click();
                                                }
                                            }
                                        }
                                    });
                                }
                            }, 100);
                        });
                    }
                });
            }
        }
    }, document.body);
}