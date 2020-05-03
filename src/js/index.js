/*-----------------------------------------------------------------------------
>>> «INDEX» TEMPLATE
-----------------------------------------------------------------------------*/

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'requestTabUrl', function(response) {
        var TAB_URL = response ? new URL(response) : '',
            HOSTNAME = TAB_URL.hostname,
            language = Satus.storage.get('language') || 'en';

        Satus.storage.import(function() {
            Satus.locale.import('_locales/' + language + '/messages.json', function() {
                Satus.modules.updateStorageKeys(Menu, function() {
                    Menu.main.section.exclude_this_website.storage_key = 'websites/' + HOSTNAME + '/exclude_this_website';
                    Menu.main.section.filters.section.invert_colors.storage_key = 'websites/' + HOSTNAME + '/filters/invert_colors';
                    Menu.main.section.filters.section.bluelight.storage_key = 'websites/' + HOSTNAME + '/filters/bluelight';
                    Menu.main.section.filters.section.brightness.storage_key = 'websites/' + HOSTNAME + '/filters/brightness';
                    Menu.main.section.filters.section.contrast.storage_key = 'websites/' + HOSTNAME + '/filters/contrast';
                    Menu.main.section.filters.section.grayscale.storage_key = 'websites/' + HOSTNAME + '/filters/grayscale';
                    Menu.main.section.filters.section.sepia.storage_key = 'websites/' + HOSTNAME + '/filters/sepia';

                    Menu.main.section.styles.textfield.storage_key = 'websites/' + HOSTNAME + '/styles';

                    var websites = Satus.storage.get('websites') || {};

                    for (var key in websites) {
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
                                            type: 'section'
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
                                value: true,
                                storage_key: 'websites/' + key + '/enabled',
                            }
                        };

                        if (websites[key].filters.hasOwnProperty('invert_colors')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.invert_colors = {
                                type: 'switch',
                                label: 'invertColors',
                                storage_key: 'websites/' + key + '/filters/invert_colors'
                            };
                        }

                        if (websites[key].filters.hasOwnProperty('bluelight')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.bluelight = {
                                type: 'slider',
                                label: 'bluelight',
                                storage_key: 'websites/' + key + '/filters/bluelight',
                                max: 90
                            };
                        }

                        if (websites[key].filters.hasOwnProperty('brightness')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.brightness = {
                                type: 'slider',
                                label: 'brightness',
                                storage_key: 'websites/' + key + '/filters/brightness',
                                max: 100,
                                value: 100
                            };
                        }

                        if (websites[key].filters.hasOwnProperty('contrast')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.contrast = {
                                type: 'slider',
                                label: 'contrast',
                                storage_key: 'websites/' + key + '/filters/contrast',
                                max: 100,
                                value: 100
                            };
                        }

                        if (websites[key].filters.hasOwnProperty('grayscale')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.grayscale = {
                                type: 'slider',
                                label: 'grayscale',
                                storage_key: 'websites/' + key + '/filters/grayscale',
                                max: 100
                            };
                        }

                        if (websites[key].filters.hasOwnProperty('sepia')) {
                            Menu.main.section.websites.section[key].folder.section.filters.section.sepia = {
                                type: 'slider',
                                label: 'sepia',
                                storage_key: 'websites/' + key + '/filters/sepia',
                                max: 100
                            };
                        }
                    }

                    Satus.render(Menu, document.body);
                });
            });
        });
    });
});