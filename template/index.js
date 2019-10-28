/*-----------------------------------------------------------------------------
>>> «INDEX» TEMPLATE
-----------------------------------------------------------------------------*/

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    let TAB_URL = new URL(tabs[0].url),
        HOSTNAME = TAB_URL.hostname;

    Menu.main = {
        type: 'main',

        filters: {
            type: 'folder',
            label: 'filters',
            icon: '<svg viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

            invert_colors: {
                label: 'invertColors',
                type: 'switch',
                storage: '/websites/' + HOSTNAME + '/filters/invert_colors'
            },
            bluelight: {
                label: 'bluelight',
                type: 'slider',
                storage: '/websites/' + HOSTNAME + '/filters/bluelight',
                max: 90
            },
            brightness: {
                label: 'brightness',
                type: 'slider',
                storage: '/websites/' + HOSTNAME + '/filters/brightness',
                max: 100,
                value: 100
            },
            contrast: {
                label: 'contrast',
                type: 'slider',
                storage: '/websites/' + HOSTNAME + '/filters/contrast',
                max: 100,
                value: 100
            },
            grayscale: {
                label: 'grayscale',
                type: 'slider',
                storage: '/websites/' + HOSTNAME + '/filters/grayscale',
                max: 100
            },
            sepia: {
                label: 'sepia',
                type: 'slider',
                storage: '/websites/' + HOSTNAME + '/filters/sepia',
                max: 100
            }
        },
        websites: {
            type: 'folder',
            label: 'websites',
            icon: '<svg viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></svg>',

            filters: {
                type: 'folder',
                icon: '<svg viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1 0 11.32 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76a5.95 5.95 0 0 1 0-8.48L12 5.1v14.49z"></svg>',

                section: {
                    type: 'section',
                    style: {
                        flexDirection: 'column'
                    },
                    on: {
                        render: function(component) {
                            let data = {},
                                websites = Satus.get('websites');

                            if (websites) {
                                for (let i in websites) {
                                    if (
                                        websites[i] &&
                                        websites[i].filters &&
                                        typeof websites[i].filters === 'object' &&
                                        Object.keys(websites[i].filters).length !== 0 &&
                                        websites[i].filters.constructor === Object
                                    ) {
                                        let website = websites[i];

                                        data[i] = {
                                            type: 'text',
                                            label: i,
                                            on: {
                                                click: function(component) {
                                                    let dialog = {
                                                        style: {
                                                            flexDirection: 'column'
                                                        }
                                                    };

                                                    if (website.filters.hasOwnProperty('invert_colors')) {
                                                        dialog.invert_colors = {
                                                            type: 'switch',
                                                            label: 'invertColors',
                                                            storage: '/websites/' + HOSTNAME + '/filters/invert_colors'
                                                        };
                                                    }

                                                    if (website.filters.hasOwnProperty('bluelight')) {
                                                        dialog.bluelight = {
                                                            type: 'slider',
                                                            label: 'bluelight',
                                                            storage: '/websites/' + HOSTNAME + '/filters/bluelight',
                                                            max: 90
                                                        };
                                                    }

                                                    if (website.filters.hasOwnProperty('brightness')) {
                                                        dialog.brightness = {
                                                            type: 'slider',
                                                            label: 'brightness',
                                                            storage: '/websites/' + HOSTNAME + '/filters/brightness',
                                                            max: 100,
                                                            value: 100
                                                        };
                                                    }

                                                    if (website.filters.hasOwnProperty('contrast')) {
                                                        dialog.contrast = {
                                                            type: 'slider',
                                                            label: 'contrast',
                                                            storage: '/websites/' + HOSTNAME + '/filters/contrast',
                                                            max: 100,
                                                            value: 100
                                                        };
                                                    }

                                                    if (website.filters.hasOwnProperty('grayscale')) {
                                                        dialog.grayscale = {
                                                            type: 'slider',
                                                            label: 'grayscale',
                                                            storage: '/websites/' + HOSTNAME + '/filters/grayscale',
                                                            max: 100
                                                        };
                                                    }

                                                    if (website.filters.hasOwnProperty('sepia')) {
                                                        dialog.sepia = {
                                                            type: 'slider',
                                                            label: 'sepia',
                                                            storage: '/websites/' + HOSTNAME + '/filters/sepia',
                                                            max: 100
                                                        };
                                                    }

                                                    dialog.footer = {
                                                        type: 'section',
                                                        class: ['satus-section--align-end'],

                                                        remove: {
                                                            type: 'button',
                                                            label: 'remove',
                                                            onclick: function(component) {
                                                                Satus.remove('/websites/' + i + '/filters');

                                                                document.querySelector('.satus-dialog__scrim').click();
                                                            }
                                                        },
                                                        ok: {
                                                            type: 'button',
                                                            label: 'ok',
                                                            onclick: function() {
                                                                document.querySelector('.satus-dialog__scrim').click();
                                                            }
                                                        }
                                                    };

                                                    Satus.dialog(dialog);
                                                }
                                            }
                                        };
                                    }
                                }
                            } else {
                                data.empty = {
                                    type: 'text',
                                    label: 'empty'
                                };
                            }

                            Satus.render(component, data);
                        }
                    }
                }
            },
            styles: {
                type: 'folder',
                icon: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></svg>',

                section: {
                    type: 'section',
                    on: {
                        render: function(component) {
                            let data = {},
                                websites = Satus.get('websites');

                            if (websites) {
                                for (let i in websites) {
                                    if (typeof websites[i].styles === 'object' && Object.keys(websites[i].styles).length !== 0 && websites[i].styles.constructor === Object) {
                                        let website = websites[i];

                                        data[i] = {
                                            type: 'text',
                                            innerText: i,
                                            onclick: function(self, component) {
                                                let dialog_container = {},
                                                    dialog = {
                                                        type: 'dialog'
                                                    };

                                                dialog_container.dialog = dialog;

                                                var css = '',
                                                    fdg = 0;

                                                for (let j in websites[i].styles) {
                                                    fdg++;

                                                    if (fdg > 1) {
                                                        css += ',\n\n';
                                                    }

                                                    css += '"' + j + '": "' + websites[i].styles[j] + '"';
                                                }

                                                css += '';

                                                dialog.textarea = {
                                                    type: 'input',
                                                    id: 'styles-list',
                                                    value: css
                                                };

                                                dialog.footer = {
                                                    type: 'section',
                                                    class: ['satus-section--align-end'],

                                                    cancel: {
                                                        type: 'button',
                                                        onclick: function() {
                                                            document.querySelector('.satus-dialog__scrim').click();
                                                        }
                                                    },
                                                    remove: {
                                                        type: 'button',
                                                        onclick: function() {
                                                            Satus.remove('/websites/' + i + '/styles');

                                                            document.querySelector('.satus-dialog__scrim').click();
                                                        }
                                                    },
                                                    save: {
                                                        type: 'button',
                                                        onclick: function() {
                                                            Satus.set('/websites/' + i + '/styles', JSON.parse('{' + document.querySelector('#styles-list').value.replace(/\n/g, '') + '}'));

                                                            document.querySelector('.satus-dialog__scrim').click();
                                                        }
                                                    }
                                                };

                                                Satus.render(dialog);
                                            }
                                        };
                                    }
                                }
                            } else {
                                data['empty'] = {
                                    type: 'text',
                                    innerText: 'empty'
                                };
                            }

                            Satus.render(data);
                        }
                    }
                }
            }
        },
        schedule: {
            type: 'folder',
            label: 'schedule',
            icon: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path fill="none" d="M0 0h24v24H0z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
        },
        settings: {
            type: 'folder',
            label: 'settings',
            icon: '<svg viewBox="0 0 24 24"><path d="M19.4 13l.1-1v-1l2-1.6c.2-.2.3-.5.2-.7l-2-3.4c-.2-.3-.4-.3-.6-.3l-2.5 1-1.7-1-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.7c-.6.2-1.1.6-1.7 1L5 5c-.2-.1-.4 0-.6.2l-2 3.4c0 .3 0 .5.2.7l2 1.6a8 8 0 0 0 0 2l-2 1.6c-.2.2-.3.5-.2.7l2 3.4c.2.3.4.3.6.3l2.5-1 1.7 1 .4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.7c.6-.2 1.1-.6 1.7-1l2.5 1c.2.1.4 0 .6-.2l2-3.4c0-.2 0-.5-.2-.7l-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"></svg>',

            languages: {
                type: 'folder',
                icon: '<svg viewBox="0 0 24 24"><path d="M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z"></svg>',

                language: {
                    label: 'language',
                    type: 'select',
                    options: [{
                        value: "en",
                        label: "English"
                    }, {
                        value: "es",
                        label: "Español (España)"
                    }, {
                        value: "es-419",
                        label: "Español (Latinoamérica)"
                    }, {
                        value: "es-US",
                        label: "Español (US)"
                    }, {
                        value: "ru",
                        label: "Русский"
                    }, {
                        value: "de",
                        label: "Deutsch"
                    }, {
                        value: "pt-PT",
                        label: "Português"
                    }, {
                        value: "pt",
                        label: "Português (Brasil)"
                    }, {
                        value: "fr",
                        label: "Français"
                    }, {
                        value: "pl",
                        label: "Polski"
                    }, {
                        value: "ja",
                        label: "日本語"
                    }, {
                        value: "af",
                        label: "Afrikaans"
                    }, {
                        value: "az",
                        label: "Azərbaycan"
                    }, {
                        value: "id",
                        label: "Bahasa Indonesia"
                    }, {
                        value: "ms",
                        label: "Bahasa Malaysia"
                    }, {
                        value: "bs",
                        label: "Bosanski"
                    }, {
                        value: "ca",
                        label: "Català"
                    }, {
                        value: "cs",
                        label: "Čeština"
                    }, {
                        value: "da",
                        label: "Dansk"
                    }, {
                        value: "et",
                        label: "Eesti"
                    }, {
                        value: "eu",
                        label: "Euskara"
                    }, {
                        value: "fil",
                        label: "Filipino"
                    }, {
                        value: "fr-CA",
                        label: "Français (Canada)"
                    }, {
                        value: "gl",
                        label: "Galego"
                    }, {
                        value: "hr",
                        label: "Hrvatski"
                    }, {
                        value: "zu",
                        label: "IsiZulu"
                    }, {
                        value: "is",
                        label: "Íslenska"
                    }, {
                        value: "it",
                        label: "Italiano"
                    }, {
                        value: "sw",
                        label: "Kiswahili"
                    }, {
                        value: "lv",
                        label: "Latviešu valoda"
                    }, {
                        value: "lt",
                        label: "Lietuvių"
                    }, {
                        value: "hu",
                        label: "Magyar"
                    }, {
                        value: "nl",
                        label: "Nederlands"
                    }, {
                        value: "no",
                        label: "Norsk"
                    }, {
                        value: "uz",
                        label: "O‘zbek"
                    }, {
                        value: "ro",
                        label: "Română"
                    }, {
                        value: "sq",
                        label: "Shqip"
                    }, {
                        value: "sk",
                        label: "Slovenčina"
                    }, {
                        value: "sl",
                        label: "Slovenščina"
                    }, {
                        value: "sr-Latn",
                        label: "Srpski"
                    }, {
                        value: "fi",
                        label: "Suomi"
                    }, {
                        value: "sv",
                        label: "Svenska"
                    }, {
                        value: "vi",
                        label: "Tiếng Việt"
                    }, {
                        value: "tr",
                        label: "Türkçe"
                    }, {
                        value: "be",
                        label: "Беларуская"
                    }, {
                        value: "bg",
                        label: "Български"
                    }, {
                        value: "ky",
                        label: "Кыргызча"
                    }, {
                        value: "kk",
                        label: "Қазақ Тілі"
                    }, {
                        value: "mk",
                        label: "Македонски"
                    }, {
                        value: "mn",
                        label: "Монгол"
                    }, {
                        value: "sr",
                        label: "Српски"
                    }, {
                        value: "uk",
                        label: "Українська"
                    }, {
                        value: "el",
                        label: "Ελληνικά"
                    }, {
                        value: "hy",
                        label: "Հայերեն"
                    }, {
                        value: "iw",
                        label: "עברית"
                    }, {
                        value: "ur",
                        label: "اردو"
                    }, {
                        value: "ar",
                        label: "العربية"
                    }, {
                        value: "fa",
                        label: "فارسی"
                    }, {
                        value: "ne",
                        label: "नेपाली"
                    }, {
                        value: "mr",
                        label: "मराठी"
                    }, {
                        value: "hi",
                        label: "हिन्दी"
                    }, {
                        value: "bn",
                        label: "বাংলা"
                    }, {
                        value: "pa",
                        label: "ਪੰਜਾਬੀ"
                    }, {
                        value: "gu",
                        label: "ગુજરાતી"
                    }, {
                        value: "ta",
                        label: "தமிழ்"
                    }, {
                        value: "te",
                        label: "తెలుగు"
                    }, {
                        value: "kn",
                        label: "ಕನ್ನಡ"
                    }, {
                        value: "ml",
                        label: "മലയാളം"
                    }, {
                        value: "si",
                        label: "සිංහල"
                    }, {
                        value: "th",
                        label: "ภาษาไทย"
                    }, {
                        value: "lo",
                        label: "ລາວ"
                    }, {
                        value: "my",
                        label: "ဗမာ"
                    }, {
                        value: "ka",
                        label: "ქართული"
                    }, {
                        value: "am",
                        label: "አማርኛ"
                    }, {
                        value: "km",
                        label: "ខ្មែរ"
                    }, {
                        value: "zh-CN",
                        label: "中文 (简体)"
                    }, {
                        value: "zh-TW",
                        label: "中文 (繁體)"
                    }, {
                        value: "zh-HK",
                        label: "中文 (香港)"
                    }, {
                        value: "ko",
                        label: "한국어"
                    }]
                }
            },
            backup_and_reset: {
                type: 'folder',
                label: 'backupAndReset',
                icon: '<svg viewBox="0 0 24 24"><path d="M13.3 3A9 9 0 0 0 4 12H2.2c-.5 0-.7.5-.3.8l2.7 2.8c.2.2.6.2.8 0L8 12.8c.4-.3.1-.8-.3-.8H6a7 7 0 1 1 2.7 5.5 1 1 0 0 0-1.3.1 1 1 0 0 0 0 1.5A9 9 0 0 0 22 11.7C22 7 18 3.1 13.4 3zm-.6 5c-.4 0-.7.3-.7.8v3.6c0 .4.2.7.5.9l3.1 1.8c.4.2.8.1 1-.2.2-.4.1-.8-.2-1l-3-1.8V8.7c0-.4-.2-.7-.7-.7z"></svg>',

                import_settings: {
                    type: 'button',
                    label: 'importSettings',
                    onclick: function(satus, component) {
                        try {
                            let input = document.createElement('input');

                            input.type = 'file';
                            input.accept = '.json';

                            input.addEventListener('change', function() {
                                let file_reader = new FileReader();

                                file_reader.onload = function() {
                                    let data = JSON.parse(this.result);

                                    for (var i in data) {
                                        Satus.storage.set(i, data[i]);
                                    }

                                    satus.components.dialog.create({
                                        type: 'dialog',

                                        message: {
                                            type: 'text',
                                            label: 'successfullyImportedSettings',
                                            styles: {
                                                'width': '100%',
                                                'opacity': '.8'
                                            }
                                        },
                                        section: {
                                            type: 'section',
                                            class: 'controls',
                                            styles: {
                                                'justify-content': 'flex-end'
                                            },

                                            cancel: {
                                                type: 'button',
                                                label: 'cancel',
                                                onclick: function() {
                                                    let scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                    scrim[scrim.length - 1].click();
                                                }
                                            },
                                            ok: {
                                                type: 'button',
                                                label: 'OK',
                                                onclick: function() {
                                                    let scrim = document.querySelectorAll('.satus-dialog__scrim');

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
                    onclick: function(satus, component) {
                        chrome.runtime.sendMessage({
                            name: 'download',
                            filename: 'improvedtube-settings',
                            value: satus.storage.get()
                        });
                    }
                },
                reset_all_settings: {
                    type: 'button',
                    label: 'resetAllSettings',
                    onclick: function(satus, component) {
                        satus.components.dialog.create({
                            type: 'dialog',

                            message: {
                                type: 'text',
                                label: 'thisWillResetAllSettings',
                                styles: {
                                    'width': '100%',
                                    'opacity': '.8'
                                }
                            },
                            section: {
                                type: 'section',
                                class: 'controls',
                                styles: {
                                    'justify-content': 'flex-end'
                                },

                                cancel: {
                                    type: 'button',
                                    label: 'cancel',
                                    onclick: function() {
                                        let scrim = document.querySelectorAll('.satus-dialog__scrim');

                                        scrim[scrim.length - 1].click();
                                    }
                                },
                                accept: {
                                    type: 'button',
                                    label: 'accept',
                                    onclick: function() {
                                        let scrim = document.querySelectorAll('.satus-dialog__scrim');

                                        satus.storage.clear();

                                        scrim[scrim.length - 1].click();
                                    }
                                }
                            }
                        });
                    }
                }
            },
            date_and_time: {
                type: 'folder',
                label: 'dateAndTime',
                icon: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.2-13c-.5 0-.8.3-.8.7v4.7c0 .4.2.7.5.9l4.1 2.5c.4.2.8 0 1-.3.2-.3.1-.7-.2-1l-3.9-2.2V7.7c0-.4-.3-.7-.7-.7z"></svg>',

                use_24_hour_format: {
                    type: 'switch',
                    label: 'use24HourFormat',
                    value: true
                }
            },
            about: {
                type: 'folder',
                icon: '<svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></svg>',

                extension_section: {
                    type: 'section',
                    label: 'extension',
                    style: {
                        minHeight: 'auto',
                        margin: '16px 0 8px',
                        flexDirection: 'column'
                    },

                    version: {
                        type: 'text',
                        label: 'version',
                        value: chrome.runtime.getManifest().version
                    },
                    permissions: {
                        type: 'text',
                        label: 'permissions',
                        value: chrome.runtime.getManifest().permissions.join(', ')
                    },
                },

                browser_section: {
                    type: 'section',
                    label: 'browser',
                    style: {
                        minHeight: 'auto',
                        margin: '16px 0 8px',
                        flexDirection: 'column'
                    },

                    name: {
                        type: 'text',
                        label: 'name',
                        value: function(satus, component) {
                            return Satus.user().browser.name;
                        }
                    },
                    version: {
                        type: 'text',
                        label: 'version',
                        value: function(satus, component) {
                            return Satus.user().browser.version;
                        }
                    },
                    platform: {
                        type: 'text',
                        label: 'platform',
                        value: function(satus, component) {
                            return Satus.user().browser.platform;
                        }
                    },
                    video_formats: {
                        type: 'text',
                        label: 'videoFormats',
                        value: function(satus, component) {
                            var formats = Satus.user().browser.video,
                                container = document.createElement('span');

                            for (var i in formats) {
                                if (formats[i]) {
                                    var format = document.createElement('span');

                                    format.innerText = i;
                                    format.dataset.status = formats[i];

                                    format.style.margin = '0 4px 0 0';
                                    format.style.cursor = 'pointer';

                                    format.addEventListener('click', function(event) {
                                        window.open('https://en.m.wikipedia.org/wiki/' + this.innerText, '_blank', 'left=' + (screen.width / 2 - 200) + ',top=' + (screen.height / 2 - 200) + ',height=400,width=400');
                                    });

                                    container.appendChild(format);
                                }
                            }

                            return container;
                        }
                    },
                    audio_formats: {
                        type: 'text',
                        label: 'audioFormats',
                        value: function(satus, component) {
                            var formats = Satus.user().browser.audio,
                                container = document.createElement('span');

                            for (var i in formats) {
                                if (formats[i]) {
                                    var format = document.createElement('span');

                                    format.innerText = i;
                                    format.dataset.status = formats[i];

                                    format.style.margin = '0 4px 0 0';
                                    format.style.cursor = 'pointer';

                                    format.addEventListener('click', function(event) {
                                        window.open('https://en.m.wikipedia.org/wiki/' + this.innerText, '_blank', 'left=' + (screen.width / 2 - 200) + ',top=' + (screen.height / 2 - 200) + ',height=400,width=400');
                                    });

                                    container.appendChild(format);
                                }
                            }

                            return container;
                        }
                    },
                    flash: {
                        type: 'text',
                        label: 'flash',
                        value: function(satus, component) {
                            return Satus.user().browser.flash ? true : false;
                        }
                    }
                },

                os_section: {
                    type: 'section',
                    label: 'os',
                    style: {
                        minHeight: 'auto',
                        margin: '16px 0 8px',
                        flexDirection: 'column'
                    },

                    os_name: {
                        type: 'text',
                        label: 'name',
                        value: function(satus, component) {
                            return Satus.user().os.name;
                        }
                    },

                    os_type: {
                        type: 'text',
                        label: 'type',
                        value: function(satus, component) {
                            return Satus.user().os.type;
                        }
                    }
                },

                device_section: {
                    type: 'section',
                    label: 'device',
                    style: {
                        minHeight: 'auto',
                        margin: '16px 0 8px',
                        flexDirection: 'column'
                    },

                    screen: {
                        type: 'text',
                        label: 'screen',
                        value: function(satus, component) {
                            return Satus.user().device.screen;
                        }
                    },
                    cores: {
                        type: 'text',
                        label: 'cores',
                        value: function(satus, component) {
                            return Satus.user().device.cores;
                        }
                    },
                    gpu: {
                        type: 'text',
                        label: 'gpu',
                        value: function(satus, component) {
                            return Satus.user().device.gpu;
                        }
                    },
                    ram: {
                        type: 'text',
                        label: 'ram',
                        value: function(satus, component) {
                            return Satus.user().device.ram;
                        }
                    }
                }
            }
        }
    };

    Satus.storage.sync(function() {
        Satus.locale(function() {
            let container = document.querySelector('.satus');

            container.innerHTML = '';

            Satus.render(container, Menu);
        });
    });
});