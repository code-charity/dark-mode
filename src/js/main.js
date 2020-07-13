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

            ection: {
                type: 'section',

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
            type: 'folder',
            before: '<svg viewBox="0 0 24 24"><path d="M19.4 13l.1-1v-1l2-1.6c.2-.2.3-.5.2-.7l-2-3.4c-.2-.3-.4-.3-.6-.3l-2.5 1-1.7-1-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.7c-.6.2-1.1.6-1.7 1L5 5c-.2-.1-.4 0-.6.2l-2 3.4c0 .3 0 .5.2.7l2 1.6a8 8 0 0 0 0 2l-2 1.6c-.2.2-.3.5-.2.7l2 3.4c.2.3.4.3.6.3l2.5-1 1.7 1 .4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.7c.6-.2 1.1-.6 1.7-1l2.5 1c.2.1.4 0 .6-.2l2-3.4c0-.2 0-.5-.2-.7l-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"></svg>',
            label: 'settings',
            parent: '.satus-main__container',
            onclick: function() {
                document.querySelector('.satus-dialog__scrim').click();
            },

            section: {
                type: 'section',

                language: {
                    label: 'language',
                    type: 'select',
                    before: '<svg viewBox="0 0 24 24"><path d="M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z" /></svg>',
                    onchange: function(name, value) {
                        Satus.memory.set('locale', {});

                        Satus.locale(function() {
                            document.querySelector('.satus-main__container').innerHTML = '';

                            document.querySelector('.satus-header__title').innerText = Satus.locale.getMessage('languages');
                            document.querySelector('#search').placeholder = Satus.locale.getMessage('search');

                            Satus.render(document.querySelector('.satus-main__container'), Menu.main.section.settings.section.languages);
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
                    type: 'folder',
                    label: 'backupAndReset',
                    before: '<svg viewBox="0 0 24 24"><path d="M13.3 3A9 9 0 0 0 4 12H2.2c-.5 0-.7.5-.3.8l2.7 2.8c.2.2.6.2.8 0L8 12.8c.4-.3.1-.8-.3-.8H6a7 7 0 1 1 2.7 5.5 1 1 0 0 0-1.3.1 1 1 0 0 0 0 1.5A9 9 0 0 0 22 11.7C22 7 18 3.1 13.4 3zm-.6 5c-.4 0-.7.3-.7.8v3.6c0 .4.2.7.5.9l3.1 1.8c.4.2.8.1 1-.2.2-.4.1-.8-.2-1l-3-1.8V8.7c0-.4-.2-.7-.7-.7z" /></svg>',

                    section: {
                        type: 'section',
                        import_settings: {
                            type: 'button',
                            label: 'importSettings',

                            onclick: function() {
                                try {
                                    var input = document.createElement('input');

                                    input.type = 'file';

                                    input.addEventListener('change', function() {
                                        var file_reader = new FileReader();

                                        file_reader.onload = function() {
                                            var data = JSON.parse(this.result);

                                            for (var i in data) {
                                                Satus.storage.set(i, data[i]);
                                            }

                                            Satus.render({
                                                type: 'dialog',
                                                class: 'satus-dialog--confirm',

                                                message: {
                                                    type: 'text',
                                                    label: 'successfullyImportedSettings'
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
                                                    ok: {
                                                        type: 'button',
                                                        label: 'OK',
                                                        onclick: function() {
                                                            var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                            scrim[scrim.length - 1].click();
                                                        }
                                                    }
                                                }
                                            });
                                        };

                                        file_reader.readAsText(this.files[0]);
                                    });

                                    input.click();
                                } catch (err) {
                                    chrome.runtime.sendMessage({
                                        name: 'dialog-error',
                                        value: err
                                    });
                                }
                            }
                        },
                        export_settings: {
                            type: 'button',
                            label: 'exportSettings',

                            onclick: function() {
                                chrome.runtime.sendMessage({
                                    name: 'download',
                                    filename: 'improvedtube-settings.json',
                                    value: Satus.storage
                                });
                            }
                        },
                        reset_all_settings: {
                            type: 'button',
                            label: 'resetAllSettings',

                            onclick: function() {
                                Satus.render({
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

                                                Satus.storage.clear();

                                                scrim[scrim.length - 1].click();
                                            }
                                        }
                                    }
                                });
                            }
                        },
                        delete_youtube_cookies: {
                            type: 'button',
                            label: 'deleteYoutubeCookies',

                            onclick: function() {
                                document.querySelector('.satus').appendChild(Satus.components.dialog({
                                    type: 'dialog',

                                    message: {
                                        type: 'text',
                                        label: 'thisWillRemoveAllYouTubeCookies',
                                        style: {
                                            'width': '100%',
                                            'opacity': '.8'
                                        }
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

                                                chrome.tabs.query({}, function(tabs) {
                                                    for (var i = 0, l = tabs.length; i < l; i++) {
                                                        if (tabs[i].hasOwnProperty('url')) {
                                                            chrome.tabs.sendMessage(tabs[i].id, {
                                                                name: 'delete_youtube_cookies'
                                                            });
                                                        }
                                                    }
                                                });

                                                scrim[scrim.length - 1].click();
                                            }
                                        }
                                    }
                                }));
                            }
                        }
                    }
                },
                date_and_time: {
                    type: 'folder',
                    label: 'dateAndTime',
                    before: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.2-13c-.5 0-.8.3-.8.7v4.7c0 .4.2.7.5.9l4.1 2.5c.4.2.8 0 1-.3.2-.3.1-.7-.2-1l-3.9-2.2V7.7c0-.4-.3-.7-.7-.7z" /></svg>',

                    section: {
                        type: 'section',

                        use_24_hour_format: {
                            type: 'switch',
                            label: 'use24HourFormat',
                            value: true
                        }
                    }
                },
                about: {
                    type: 'folder',
                    before: '<svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>',
                    label: 'about',
                    appearanceKey: 'about',

                    section: {
                        type: 'section',

                        onrender: function() {
                            var component = this,
                                manifest = chrome.runtime.getManifest(),
                                user = Satus.modules.user(),
                                object = {
                                    extension_section: {
                                        type: 'section',
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
                                Satus.render(object, component.parentNode);

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
