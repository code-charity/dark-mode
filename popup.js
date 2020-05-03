
function update(container) {
    var self = (this === window ? document.querySelector('.satus-main') : this),
        item = self.history[self.history.length - 1],
        id = item.appearanceKey;

    if (!Satus.isset(container)) {
        container = document.querySelector('.satus-main__container');
    }

    document.body.dataset.appearance = id;
    container.dataset.appearance = id;

    document.querySelector('.satus-text--title').innerText = Satus.locale.getMessage(item.label) || 'Night Mode';
}
/*-----------------------------------------------------------------------------
>>> «HEADER» TEMPLATE
-----------------------------------------------------------------------------*/

var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            go_back: {
                type: 'button',
                class: 'satus-button--back',
                before: '<svg stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
                onclick: function() {
                    document.querySelector('.satus-main').back();
                }
            },
            title: {
                type: 'text',
                class: 'satus-text--title',
                label: 'Night Mode'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            mode: {
                type: 'switch',
                class: 'satus-switch--night-mode',
                before: '<svg class="satus-switch__icon" viewBox="0 0 16 16"><path d="M7.49 2a.5.5 0 0 0-.49.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5zM3.6 3.61a.5.5 0 0 0-.34.85l.7.71a.5.5 0 0 0 .86-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.37-.15zm7.77 0a.5.5 0 0 0-.33.15l-.71.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zM7.46 5a3 3 0 0 0-2.08 5.12 3 3 0 0 0 4.24-4.24A3 3 0 0 0 7.46 5zM2 7.5a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm10 0a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-7.7 3.18a.5.5 0 0 0-.34.15l-.7.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zm6.38 0a.5.5 0 0 0-.35.86l.7.7a.5.5 0 0 0 .71 0 .5.5 0 0 0 .15-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.36-.15zM7.48 12a.5.5 0 0 0-.48.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5z"/></svg>',
                after: '<svg class="satus-switch__icon" viewBox="0 0 16 16"><path d="M7.5 4A4.5 4.5 0 0 0 3 8.5 4.5 4.5 0 0 0 7.5 13a4.5 4.5 0 0 0 4.201-2.905 3.938 3.938 0 0 1-.826.092A3.938 3.938 0 0 1 6.937 6.25a3.938 3.938 0 0 1 .704-2.243A4.5 4.5 0 0 0 7.5 4z"/></svg>',
                value: true,
                onchange: function() {
                    this.dataset.value = this.querySelector('input').checked;
                },
                onrender: function() {
                    this.dataset.value = this.querySelector('input').checked;
                }
            }
        }
    }
};
Menu.main = {
    type: 'main',
    appearanceKey: 'home',
    on: {
        change: update
    },

    section: {
        type: 'section',

        only_on_this_website: {
            type: 'button',
            label: 'onlyEnableForThisWebsite',
            onclick: function() {
                var websites = Satus.storage.get('websites');

                for (var key in websites) {
                    if (key != HOSTNAME) {
                        Satus.storage.set('websites/' + key + '/enabled', false);
                        Satus.storage.set('websites/' + key + '/exclude_this_website', true);
                    } else {
                        Satus.storage.set('websites/' + key + '/enabled', true);
                        Satus.storage.set('websites/' + key + '/exclude_this_website', false);
                        document.querySelector('#exclude').dataset.value = false;
                    }
                }
            }
        },
        exclude_this_website: {
            type: 'switch',
            label: 'excludeThisWebsite'
        },
        filters: {
            type: 'folder',
            label: 'filters',
            before: '<svg viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

            section: {
                type: 'section',

                invert_colors: {
                    label: 'invertColors',
                    type: 'switch',
                    value: true
                },
                bluelight: {
                    label: 'bluelight',
                    type: 'slider',
                    max: 90
                },
                brightness: {
                    label: 'brightness',
                    type: 'slider',
                    max: 100,
                    value: 100
                },
                contrast: {
                    label: 'contrast',
                    type: 'slider',
                    max: 100,
                    value: 100
                },
                grayscale: {
                    label: 'grayscale',
                    type: 'slider',
                    max: 100
                },
                sepia: {
                    label: 'sepia',
                    type: 'slider',
                    max: 100
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
                onrender: function(object) {
                    this.dataset.storageKey = object.storage_key;
                    this.value = Satus.storage.get(object.storage_key) || '';
                },
                oninput: function() {
                    Satus.storage.set(this.dataset.storageKey, this.value);
                }
            }
        },
        websites: {
            type: 'folder',
            label: 'websites',
            appearanceKey: 'websites',
            before: '<svg viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></svg>',

            section: {
                type: 'section'
            }
        },
        schedule: {
            type: 'folder',
            label: 'schedule',
            before: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path fill="none" d="M0 0h24v24H0z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',

            schedule: {
                type: 'select',
                label: 'schedule',

                options: [{
                    label: 'disabled',
                    value: 'disabled'
                }, {
                    label: 'sunsetToSunrise',
                    value: 'sunset_to_sunrise'
                }, {
                    label: 'systemPeference',
                    value: 'system_peference'
                }]
            },
            time_from: {
                type: 'select',
                label: 'timeFrom',
                options: [{
                    label: '00:00',
                    value: '00:00'
                }, {
                    label: '01:00',
                    value: '01:00'
                }, {
                    label: '02:00',
                    value: '02:00'
                }, {
                    label: '03:00',
                    value: '03:00'
                }, {
                    label: '04:00',
                    value: '04:00'
                }, {
                    label: '05:00',
                    value: '05:00'
                }, {
                    label: '06:00',
                    value: '06:00'
                }, {
                    label: '07:00',
                    value: '07:00'
                }, {
                    label: '08:00',
                    value: '08:00'
                }, {
                    label: '09:00',
                    value: '09:00'
                }, {
                    label: '10:00',
                    value: '10:00'
                }, {
                    label: '11:00',
                    value: '11:00'
                }, {
                    label: '12:00',
                    value: '12:00'
                }, {
                    label: '13:00',
                    value: '13:00'
                }, {
                    label: '14:00',
                    value: '14:00'
                }, {
                    label: '15:00',
                    value: '15:00'
                }, {
                    label: '16:00',
                    value: '16:00'
                }, {
                    label: '17:00',
                    value: '17:00'
                }, {
                    label: '18:00',
                    value: '18:00'
                }, {
                    label: '19:00',
                    value: '19:00'
                }, {
                    label: '20:00',
                    value: '20:00'
                }, {
                    label: '21:00',
                    value: '21:00'
                }, {
                    label: '22:00',
                    value: '22:00'
                }, {
                    label: '23:00',
                    value: '23:00'
                }]
            },
            time_to: {
                type: 'select',
                label: 'timeTo',
                options: [{
                    label: '00:00',
                    value: '00:00'
                }, {
                    label: '01:00',
                    value: '01:00'
                }, {
                    label: '02:00',
                    value: '02:00'
                }, {
                    label: '03:00',
                    value: '03:00'
                }, {
                    label: '04:00',
                    value: '04:00'
                }, {
                    label: '05:00',
                    value: '05:00'
                }, {
                    label: '06:00',
                    value: '06:00'
                }, {
                    label: '07:00',
                    value: '07:00'
                }, {
                    label: '08:00',
                    value: '08:00'
                }, {
                    label: '09:00',
                    value: '09:00'
                }, {
                    label: '10:00',
                    value: '10:00'
                }, {
                    label: '11:00',
                    value: '11:00'
                }, {
                    label: '12:00',
                    value: '12:00'
                }, {
                    label: '13:00',
                    value: '13:00'
                }, {
                    label: '14:00',
                    value: '14:00'
                }, {
                    label: '15:00',
                    value: '15:00'
                }, {
                    label: '16:00',
                    value: '16:00'
                }, {
                    label: '17:00',
                    value: '17:00'
                }, {
                    label: '18:00',
                    value: '18:00'
                }, {
                    label: '19:00',
                    value: '19:00'
                }, {
                    label: '20:00',
                    value: '20:00'
                }, {
                    label: '21:00',
                    value: '21:00'
                }, {
                    label: '22:00',
                    value: '22:00'
                }, {
                    label: '23:00',
                    value: '23:00'
                }]
            }
        }
    },

    made_with_love: {
        type: 'text',
        class: 'made-with-love',
        innerHTML: 'Made with <svg viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></svg> by <span>ImprovedTube</span>',
        on: {
            click: function() {
                window.open('https://chrome.google.com/webstore/detail/improve-youtube-open-sour/bnomihfieiccainjcjblhegjgglakjdd');
            }
        }
    }
};
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