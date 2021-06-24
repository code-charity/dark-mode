
/*-----------------------------------------------------------------------------
>>> HEADER
-----------------------------------------------------------------------------*/
var HOSTNAME;

var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            go_back: {
                type: 'button',
                variant: 'text',
                class: 'satus-button--back',
                before: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
                onclick: function() {
                    document.querySelector('.satus-main').back();
                }
            },
            title: {
                type: 'text',
                class: 'satus-text--title',
                label: 'Dark Mode'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            mode: {
                type: 'switch',
                class: 'satus-switch--dark-mode',
                before: '<svg class="satus-switch__icon" viewBox="0 0 16 16"><path d="M7.49 2a.5.5 0 0 0-.49.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5zM3.6 3.61a.5.5 0 0 0-.34.85l.7.71a.5.5 0 0 0 .86-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.37-.15zm7.77 0a.5.5 0 0 0-.33.15l-.71.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zM7.46 5a3 3 0 0 0-2.08 5.12 3 3 0 0 0 4.24-4.24A3 3 0 0 0 7.46 5zM2 7.5a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm10 0a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-7.7 3.18a.5.5 0 0 0-.34.15l-.7.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zm6.38 0a.5.5 0 0 0-.35.86l.7.7a.5.5 0 0 0 .71 0 .5.5 0 0 0 .15-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.36-.15zM7.48 12a.5.5 0 0 0-.48.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5z"/></svg>',
                after: '<svg class="satus-switch__icon" viewBox="0 0 16 16"><path d="M7.5 4A4.5 4.5 0 0 0 3 8.5 4.5 4.5 0 0 0 7.5 13a4.5 4.5 0 0 0 4.201-2.905 3.938 3.938 0 0 1-.826.092A3.938 3.938 0 0 1 6.937 6.25a3.938 3.938 0 0 1 .704-2.243A4.5 4.5 0 0 0 7.5 4z"/></svg>',
                value: true,
                onchange: function() {
                    var container = document.createElement('div'),
                        wrapper = document.createElement('div');

                    this.dataset.value = this.querySelector('input').checked;

                    container.classList.add('satus');
                    container.classList.add('loading');

                    wrapper.classList.add('satus__wrapper');

                    if (this.querySelector('input').checked) {
                        container.classList.add('dark');
                    }

                    satus.render(Menu, wrapper);

                    container.appendChild(wrapper);

                    container.querySelector('main').history = Object.assign(document.querySelector('main').history);

                    container.querySelector('main').open(container.querySelector('main').history[container.querySelector('main').history.length - 1], function() {}, false);

                    document.body.appendChild(container);

                    setTimeout(function() {
                        container.querySelector('main').history.pop();

                        container.classList.remove('loading');
                    });

                    setTimeout(function() {
                        container.previousElementSibling.remove();
                    }, 500);
                },
                onrender: function() {
                    this.dataset.value = this.querySelector('input').checked;
                }
            },

            button_vert: {
                type: 'button',
                class: 'satus-dialog--vertical-menu-button',
                before: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="5.25" r="0.45"/><circle cx="12" cy="12" r="0.45"/><circle cx="12" cy="18.75" r="0.45"/></svg>',
                onclick: {
                    type: 'dialog',
                    class: 'satus-dialog--vertical-menu',

                    websiteTextEditor: {
                        type: 'switch',
                        label: 'textEditorMode',
                        onclick: function() {
                            document.body.dataset.websiteTextEditor = this.querySelector('input').checked;
                        }
                    }
                }
            }
        }
    }
};

Menu.main = {
    type: 'main',
    appearanceKey: 'home',
    on: {
        change: function(container) {
            var self = (this === window ? document.querySelector('.satus-main') : this),
                item = self.history[self.history.length - 1],
                id = item.appearanceKey;

            if (!satus.isset(container)) {
                container = document.querySelector('.satus-main__container');
            }

            document.querySelector('.satus-text--title').innerText = satus.locale.getMessage(this.history[this.history.length - 1].label) || 'Dark Mode';

            document.body.dataset.appearance = id;
            container.dataset.appearance = id;
        }
    },

    toolbar: {
        type: 'section',
        class: 'satus-section--toolbar',

        enable: {
            type: 'switch',
            value: true
        }
    },
    section: {
        type: 'section',
        variant: 'card',

        filters: {
            type: 'button',

            label: 'filters',
            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

            tabs: {
                type: 'tabs',

                global: {
                    type: 'tab',
                    label: 'global',

                    section: {
                        type: 'section',
                        variant: 'card',

                        invert_colors: {
                            type: 'switch',
                            label: 'invertColors',
                            value: true
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
                                    max: 90
                                }
                            }
                        },
                        brightness: {
                            type: 'slider',
                            label: 'brightness',
                            max: 100,
                            value: 100
                        },
                        contrast: {
                            type: 'slider',
                            label: 'contrast',
                            max: 100,
                            value: 100
                        },
                        grayscale: {
                            type: 'slider',
                            label: 'grayscale',
                            max: 100
                        }
                    }
                },
                current: {
                    type: 'tab',
                    label: '',

                    section: {
                        type: 'section',
                        variant: 'card',

                        use_global: {
                            type: 'switch',
                            label: 'useGlobal',
                            value: true,
                            onrender: function() {
                                this.dataset.value = this.querySelector('input').checked;
                            },
                            onchange: function() {
                                this.dataset.value = this.querySelector('input').checked;
                            }
                        },
                        invert_colors: {
                            type: 'switch',
                            label: 'invertColors',
                            value: true
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
                                    max: 90
                                }
                            }
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
                        }
                    }
                }
            }
        },
        styles: {
            type: 'button',

            label: 'styles',
            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></svg>',

            tabs: {
                type: 'tabs',

                global: {
                    type: 'tab',
                    label: 'global',

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
                            object.storage_key = 'styles';
                            this.dataset.storageKey = object.storage_key;
                            this.value = satus.storage.get(object.storage_key) || '';
                        },
                        oninput: function() {
                            satus.storage.set(this.dataset.storageKey, this.value);
                        }
                    }
                },
                current: {
                    type: 'tab',
                    label: '',

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
                            object.storage_key = 'websites/' + HOSTNAME + '/styles';
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
        websites: {
            type: 'button',

            label: 'websites',
            appearanceKey: 'websites',
            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></svg>',

            section: {},

            textfield: {
                type: 'text-field',
                class: 'websites-textfield',
                style: {
                    margin: '16px',
                    height: 'calc(100vh - 96px)',
                    fontFamily: 'monospace'
                },
                rows: 6,
                spellcheck: false,
                oninput: function() {
                    var websites = {},
                        regex = /^\s*(\S+).*:\s*(\S+)[\s\n]*$/gm,
                        match,
                        url;

                    while (match = regex.exec(this.value)) {
                        if (/invert_colors|bluelight|brightness|contrast|grayscale/.test(match[1]) === true) {
                            websites[url].filters[match[1]] = match[1] === 'invert_colors' ? match[2] === 'false' ? false : true : Number(match[2]);
                        } else {
                            url = match[1];

                            websites[url] = {
                                enabled: match[2] === 'false' ? false : true,
                                filters: {}
                            };
                        }
                    }

                    satus.storage.set('websites', websites);
                }
            }
        },
        schedule: {
            type: 'button',

            label: 'schedule',
            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path fill="none" d="M0 0h24v24H0z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',

            ection: {
                type: 'section',
                variant: 'card',

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
        settings: {
            type: 'button',

            before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M19.4 13l.1-1v-1l2-1.6c.2-.2.3-.5.2-.7l-2-3.4c-.2-.3-.4-.3-.6-.3l-2.5 1-1.7-1-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.7c-.6.2-1.1.6-1.7 1L5 5c-.2-.1-.4 0-.6.2l-2 3.4c0 .3 0 .5.2.7l2 1.6a8 8 0 0 0 0 2l-2 1.6c-.2.2-.3.5-.2.7l2 3.4c.2.3.4.3.6.3l2.5-1 1.7 1 .4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.7c.6-.2 1.1-.6 1.7-1l2.5 1c.2.1.4 0 .6-.2l2-3.4c0-.2 0-.5-.2-.7l-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"></svg>',
            label: 'settings',
            parent: '.satus-main__container',

            section_01: {
                type: 'section',
                variant: 'card',

                hide_made_with_love: {
                    type: 'switch',
                    label: 'hideMadeWithLove',
                    onchange: function() {
                        document.documentElement.dataset.hideMadeWithLove = satus.storage.get('hide_made_with_love');
                    }
                }
            },

            section: {
                type: 'section',
                variant: 'card',

                language: {
                    label: 'language',
                    type: 'select',
                    before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z" /></svg>',
                    onchange: function() {
                        setTimeout(function() {
                            satus.locale.import(satus.storage.get('language'), function() {
                                document.querySelector('.satus-main__container .satus-scrollbar__content').innerHTML = '';

                                document.querySelector('.satus-text--title').innerText = satus.locale.getMessage('languages');
                                satus.render(Menu.main.section.settings.section, document.querySelector('.satus-main__container .satus-scrollbar__content'));
                            });
                        });
                    },
                    options: [{
                        value: "en",
                        label: "English"
                    }, {
                        value: "ru",
                        label: "Русский"
                    }]
                },
                backup_and_reset: {
                    type: 'button',
                    label: 'backupAndReset',
                    before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M13.3 3A9 9 0 0 0 4 12H2.2c-.5 0-.7.5-.3.8l2.7 2.8c.2.2.6.2.8 0L8 12.8c.4-.3.1-.8-.3-.8H6a7 7 0 1 1 2.7 5.5 1 1 0 0 0-1.3.1 1 1 0 0 0 0 1.5A9 9 0 0 0 22 11.7C22 7 18 3.1 13.4 3zm-.6 5c-.4 0-.7.3-.7.8v3.6c0 .4.2.7.5.9l3.1 1.8c.4.2.8.1 1-.2.2-.4.1-.8-.2-1l-3-1.8V8.7c0-.4-.2-.7-.7-.7z" /></svg>',

                    section: {
                        type: 'section',
                        variant: 'card',

                        import_settings: {
                            type: 'button',
                            label: 'importSettings',
                            onclick: function() {
                                if (location.href.indexOf('/options.html') !== -1) {
                                    importData();
                                } else {
                                    chrome.tabs.create({
                                        url: 'options.html?action=import'
                                    });
                                }
                            }
                        },
                        export_settings: {
                            type: 'button',
                            label: 'exportSettings',
                            onclick: function() {
                                if (location.href.indexOf('/options.html') !== -1) {
                                    exportData();
                                } else {
                                    chrome.tabs.create({
                                        url: 'options.html?action=export'
                                    });
                                }
                            }
                        },
                        reset_all_settings: {
                            type: 'button',
                            label: 'resetAllSettings',

                            onclick: function() {
                                satus.render({
                                    type: 'dialog',
                                    class: 'satus-dialog--confirm',

                                    message: {
                                        type: 'text',
                                        label: 'thisWillResetAllSettings'
                                    },
                                    section: {
                                        type: 'section',
                                        class: 'controls',
                                        style: {
                                            'justify-content': 'flex-end',
                                            'display': 'flex'
                                        },

                                        cancel: {
                                            type: 'button',
                                            label: 'cancel',
                                            onclick: function() {
                                                var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                scrim[scrim.length - 1].click();
                                            }
                                        },
                                        accept: {
                                            type: 'button',
                                            label: 'accept',
                                            onclick: function() {
                                                var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                satus.storage.clear();

                                                scrim[scrim.length - 1].click();
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                },
                date_and_time: {
                    type: 'button',
                    label: 'dateAndTime',
                    before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.2-13c-.5 0-.8.3-.8.7v4.7c0 .4.2.7.5.9l4.1 2.5c.4.2.8 0 1-.3.2-.3.1-.7-.2-1l-3.9-2.2V7.7c0-.4-.3-.7-.7-.7z" /></svg>',

                    section: {
                        type: 'section',
                        variant: 'card',

                        use_24_hour_format: {
                            type: 'switch',
                            label: 'use24HourFormat',
                            value: true
                        }
                    }
                },
                about: {
                    type: 'button',
                    before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>',
                    label: 'about',
                    appearanceKey: 'about',

                    section: {
                        type: 'section',
                        variant: 'card',

                        onrender: function() {
                            var component = this,
                                manifest = chrome.runtime.getManifest(),
                                user = satus.user(),
                                object = {
                                    extension_section: {
                                        type: 'section',
                                        variant: 'card',
                                        label: 'extension',
                                        style: {
                                            'flex-direction': 'column',
                                            'flex': '0'
                                        },

                                        version: {
                                            type: 'text',
                                            label: 'version',
                                            value: manifest.version
                                        },
                                        permissions: {
                                            type: 'text',
                                            label: 'permissions',
                                            value: manifest.permissions.join(', ').replace('https://www.youtube.com/', 'YouTube')
                                        },
                                    },
                                    browser_section: {
                                        type: 'section',
                                        variant: 'card',
                                        label: 'browser',
                                        style: {
                                            'flex-direction': 'column',
                                            'flex': '0'
                                        },

                                        name: {
                                            type: 'text',
                                            label: 'name',
                                            value: user.browser.name
                                        },
                                        version: {
                                            type: 'text',
                                            label: 'version',
                                            value: user.browser.version
                                        },
                                        platform: {
                                            type: 'text',
                                            label: 'platform',
                                            value: user.browser.platform
                                        },
                                        video_formats: {
                                            type: 'text',
                                            label: 'videoFormats',
                                            value: user.browser.video
                                        },
                                        audio_formats: {
                                            type: 'text',
                                            label: 'audioFormats',
                                            value: user.browser.audio
                                        },
                                        flash: {
                                            type: 'text',
                                            label: 'flash',
                                            value: user.browser.flash ? true : false
                                        }
                                    },
                                    os_section: {
                                        type: 'section',
                                        variant: 'card',
                                        label: 'os',
                                        style: {
                                            'flex-direction': 'column',
                                            'flex': '0'
                                        },

                                        os_name: {
                                            type: 'text',
                                            label: 'name',
                                            value: user.os.name
                                        },

                                        os_type: {
                                            type: 'text',
                                            label: 'type',
                                            value: user.os.type
                                        }
                                    },
                                    device_section: {
                                        type: 'section',
                                        variant: 'card',
                                        label: 'device',
                                        style: {
                                            'flex-direction': 'column',
                                            'flex': '0'
                                        },

                                        screen: {
                                            type: 'text',
                                            label: 'screen',
                                            value: user.device.screen
                                        },
                                        cores: {
                                            type: 'text',
                                            label: 'cores',
                                            value: user.device.cores
                                        },
                                        gpu: {
                                            type: 'text',
                                            label: 'gpu',
                                            value: user.device.gpu
                                        },
                                        ram: {
                                            type: 'text',
                                            label: 'ram',
                                            value: user.device.ram
                                        }
                                    }
                                };

                            setTimeout(function() {
                                satus.render(object, component.parentNode);

                                component.remove();
                            });
                        }
                    }
                }
            }
        }
    },

    made_with_love: {
        type: 'text',
        class: 'made-with-love',
        innerHTML: 'Made with <svg viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></svg> by <span>ImprovedTube</span>',
        onclick: function() {
            window.open('https://chrome.google.com/webstore/detail/improve-youtube-open-sour/bnomihfieiccainjcjblhegjgglakjdd');
        }
    }
};
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
    }, document.body);
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
