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
                    console.log(Menu);
                    Satus.render(Menu, document.body);
                });
            });
        });

        return false;

        document.querySelector('.satus').addEventListener('satus-navigate', function(event) {
            if (event.detail.name === 'main') {
                document.querySelector('.satus-header__title').innerText = 'Night Mode';
                document.querySelector('.satus-header__title').title = '';
            } else {
                var title = '',
                    description = [];

                for (var i = 0, l = event.detail.path.length; i < l; i++) {
                    var part = event.detail.path[i];

                    if (i === 0) {
                        part = 'home';
                    }

                    if (Satus.memory.get('locale/' + part)) {
                        description.push(Satus.memory.get('locale/' + part))
                    }
                }

                if (event.detail.item.hasOwnProperty('label')) {
                    title = Satus.memory.get('locale/' + event.detail.item.label) || event.detail.item.label;
                } else {
                    title = Satus.memory.get('locale/' + event.detail.name) || event.detail.name;
                }

                if (title.length > 16) {
                    title = title.substr(0, 16) + '...';
                }

                document.querySelector('.satus-header__title').innerText = title;
                document.querySelector('.satus-header__title').title = description.join(' > ');
            }
        });


        /*-------------------------------------------------------------------------
        # INITIALIZATION
        -------------------------------------------------------------------------*/

        Satus.chromium_storage.sync(function() {
            Satus.locale(function() {
                let container = document.querySelector('.satus');

                container.innerHTML = '';


                /*-----------------------------------------------------------------
                # WEBSITES
                -----------------------------------------------------------------*/

                let websites = Satus.storage.get('websites') || {};

                for (let key in websites) {
                    Menu.main.websites[key] = {
                        type: 'section',

                        folder: {
                            type: 'folder',
                            label: key,

                            filters: {
                                type: 'folder',
                                icon: '<svg viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>'
                            },
                            styles: {
                                type: 'folder',
                                icon: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></svg>',

                                styles: {
                                    type: 'textarea',
                                    storage: 'websites/' + key + '/styles',
                                    placeholder: 'html, body { ... }',
                                    style: {
                                        margin: '16px',
                                        height: 'calc(100vh - 96px)',
                                        fontFamily: 'monospace'
                                    },
                                    on: {
                                        render: function(element) {
                                            element.value = Satus.storage.get(element.storage) || '';
                                        },
                                        input: function() {
                                            Satus.storage.set(this.storage, this.value);
                                        }
                                    }
                                }
                            }
                        },
                        enabled: {
                            type: 'switch',
                            value: true,
                            storage: 'websites/' + key,
                        }
                    };

                    if (websites[key].filters.hasOwnProperty('invert_colors')) {
                        Menu.main.websites[key].folder.filters.invert_colors = {
                            type: 'switch',
                            label: 'invertColors',
                            storage: 'websites/' + key + '/filters'
                        };
                    }

                    if (websites[key].filters.hasOwnProperty('bluelight')) {
                        Menu.main.websites[key].folder.filters.bluelight = {
                            type: 'slider',
                            label: 'bluelight',
                            storage: 'websites/' + key + '/filters',
                            max: 90
                        };
                    }

                    if (websites[key].filters.hasOwnProperty('brightness')) {
                        Menu.main.websites[key].folder.filters.brightness = {
                            type: 'slider',
                            label: 'brightness',
                            storage: 'websites/' + key + '/filters',
                            max: 100,
                            value: 100
                        };
                    }

                    if (websites[key].filters.hasOwnProperty('contrast')) {
                        Menu.main.websites[key].folder.filters.contrast = {
                            type: 'slider',
                            label: 'contrast',
                            storage: 'websites/' + key + '/filters',
                            max: 100,
                            value: 100
                        };
                    }

                    if (websites[key].filters.hasOwnProperty('grayscale')) {
                        Menu.main.websites[key].folder.filters.grayscale = {
                            type: 'slider',
                            label: 'grayscale',
                            storage: 'websites/' + key + '/filters',
                            max: 100
                        };
                    }

                    if (websites[key].filters.hasOwnProperty('sepia')) {
                        Menu.main.websites[key].folder.filters.sepia = {
                            type: 'slider',
                            label: 'sepia',
                            storage: 'websites/' + key + '/filters',
                            max: 100
                        };
                    }
                }


                /*-----------------------------------------------------------------
                # RENDERING
                -----------------------------------------------------------------*/

                Satus.render(container, Menu);
            });
        });
    });
});