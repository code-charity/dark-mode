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