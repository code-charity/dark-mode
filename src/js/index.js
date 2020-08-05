/*---------------------------------------------------------------
>>> TABLE OF CONTENTS:
-----------------------------------------------------------------
1.0 
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 
---------------------------------------------------------------*/

function init(response) {
    var TAB_URL = response ? new URL(response) : '',
        language = Satus.storage.get('language') || 'en';

    HOSTNAME = TAB_URL.hostname || '';

    Satus.storage.import(function() {
        if (!Satus.isset(Satus.storage.get('mode')) || Satus.storage.get('mode') === true) {
            document.querySelector('.satus').classList.add('dark');
        }

        Satus.locale.import('_locales/' + language + '/messages.json', function() {
            Satus.modules.updateStorageKeys(Menu, function() {
                if (HOSTNAME === '') {
                    Menu.main.tooltip.class = '';
                    
                    Menu.main.tooltip.style = {
                        padding: 0
                    };

                    Menu.main.tooltip.enable.type = 'text';
                    delete Menu.main.tooltip.enable.onrender;
                    delete Menu.main.tooltip.enable.onclick;
                    Menu.main.tooltip.enable.label = 'notAllowedtoAccessThisPage';
                    Menu.main.tooltip.enable.value = '';
                    Menu.main.tooltip.enable.style = {
                        'display': 'block',
                        'padding': '8px 16px',
                        'border': '1px solid rgba(255,0,0,.3)',
                        'borderRadius': '8px',
                        'backgroundColor': 'rgba(255,0,0,.1)'
                    };
                } else {
                    Menu.main.tooltip.enable.label = HOSTNAME;
                    Menu.main.tooltip.enable.storage_key = 'websites/' + HOSTNAME + '/enabled';
                }

                Menu.main.section.filters.section.invert_colors.storage_key = 'websites/' + HOSTNAME + '/filters/invert_colors';
                Menu.main.section.filters.section.bluelight.storage_key = 'websites/' + HOSTNAME + '/filters/bluelight';
                Menu.main.section.filters.section.brightness.storage_key = 'websites/' + HOSTNAME + '/filters/brightness';
                Menu.main.section.filters.section.contrast.storage_key = 'websites/' + HOSTNAME + '/filters/contrast';
                Menu.main.section.filters.section.grayscale.storage_key = 'websites/' + HOSTNAME + '/filters/grayscale';
                Menu.main.section.filters.section.sepia.storage_key = 'websites/' + HOSTNAME + '/filters/sepia';

                Menu.main.section.styles.textfield.storage_key = 'websites/' + HOSTNAME + '/styles';

                var websites = Satus.storage.get('websites') || {},
                    count = 0;

                for (var key in websites) {
                    if (key !== '') {
                        count++;

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
                                        before: '<svg viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

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
                                        before: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></svg>',

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
                                                this.value = Satus.storage.get(object.storage_key) || '';
                                            },
                                            oninput: function() {
                                                Satus.storage.set(this.dataset.storageKey, this.value);
                                            }
                                        }
                                    }
                                }
                            },
                            enabled: {
                                type: 'switch',
                                storage_key: 'websites/' + key + '/exclude_this_website',
                                onrender: function(obj) {
                                    var item = this.querySelector('input');

                                    item.checked = item.checked ? false : true;
                                },
                                onchange: function(obj) {
                                    var item = this.querySelector('input');

                                    Satus.storage.set(item.dataset.storageKey, item.checked ? false : true);
                                }
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
                }

                Satus.render(Menu, document.querySelector('.satus__wrapper'));
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
