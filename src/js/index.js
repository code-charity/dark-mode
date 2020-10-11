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
    Menu.main.section.filters.tabs.current.section.invert_colors.storage_key = 'websites/' + HOSTNAME + '/filters/invert_colors';
    Menu.main.section.filters.tabs.current.section.bluelight.storage_key = 'websites/' + HOSTNAME + '/filters/bluelight';
    Menu.main.section.filters.tabs.current.section.brightness.storage_key = 'websites/' + HOSTNAME + '/filters/brightness';
    Menu.main.section.filters.tabs.current.section.contrast.storage_key = 'websites/' + HOSTNAME + '/filters/contrast';
    Menu.main.section.filters.tabs.current.section.grayscale.storage_key = 'websites/' + HOSTNAME + '/filters/grayscale';
    Menu.main.section.filters.tabs.current.section.sepia.storage_key = 'websites/' + HOSTNAME + '/filters/sepia';

    document.body.dataset.websiteTextEditor = satus.storage.get('websiteTextEditor');
    
    var websites = satus.storage.get('websites') || {},
        text = '',
        count = 0;
        
    Menu.main.section.websites.section = {
        type: 'section',
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
                    '\n    grayscale: ' + (satus.storage.get('websites/' + key + '/filters/grayscale') || 0) +
                    '\n    sepia: ' + (satus.storage.get('websites/' + key + '/filters/sepia') || 0) + '\n\n';

            Menu.main.section.websites.section[key] = {
                type: 'section',

                folder: {
                    type: 'folder',
                    label: key,

                    section: {
                        type: 'section',

                        filters: {
                            type: 'folder',
                            label: 'filters',
                            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

                            section: {
                                type: 'section',

                                invert_colors: {
                                    label: 'invertColors',
                                    type: 'switch',
                                    value: true,
                                    storage_key: 'websites/' + key + '/filters/invert_colors'
                                },
                                bluelight: {
                                    label: 'bluelight',
                                    type: 'slider',
                                    max: 90,
                                    storage_key: 'websites/' + key + '/filters/bluelight'
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
                                },
                                sepia: {
                                    label: 'sepia',
                                    type: 'slider',
                                    max: 100,
                                    storage_key: 'websites/' + key + '/filters/sepia'
                                }
                            }
                        },
                        styles: {
                            type: 'folder',
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

function init(response) {
    var TAB_URL = response ? new URL(response) : '';

    HOSTNAME = TAB_URL.hostname || '';

    satus.storage.import(function() {
        var language = satus.storage.get('language') || 'en';
        
        if (!satus.isset(satus.storage.get('mode')) || satus.storage.get('mode') === true) {
            document.querySelector('.satus').classList.add('dark');
        }

        satus.locale.import(language, function() {
            satus.modules.updateStorageKeys(Menu, function() {
                if (HOSTNAME === '') {
                    Menu.main.toolbar.enable.type = 'text';
                    delete Menu.main.toolbar.enable.onrender;
                    delete Menu.main.toolbar.enable.onclick;
                    Menu.main.toolbar.enable.label = 'somethingWentWrongPleaseTryReloadTheWebsite';
                    Menu.main.toolbar.enable.value = '';
                    Menu.main.toolbar.enable.style = {
                        lineHeight: '20px'
                    };
                } else {
                    Menu.main.toolbar.enable.label = HOSTNAME;
                    Menu.main.toolbar.enable.storage_key = 'websites/' + HOSTNAME + '/enabled';
                }

                updateWebsites();
            });
        });
    });
}

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    if (tabs[0].hasOwnProperty('url')) {
        chrome.tabs.sendMessage(tabs[0].id, 'requestTabUrl', init);
    } else {
        init();
    }
});
