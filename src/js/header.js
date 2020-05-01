/*-----------------------------------------------------------------------------
>>> «HEADER» TEMPLATE
-----------------------------------------------------------------------------*/

var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            back: {
                type: 'button',
                class: 'satus-button--back',
                icon: '<svg viewBox="0 0 24 24" style=width:20px;height:20px><path d="M16.6 3c-.5-.5-1.3-.5-1.8 0l-8.3 8.3a1 1 0 0 0 0 1.4l8.3 8.3a1.2 1.2 0 1 0 1.8-1.7L9.4 12l7.2-7.3c.5-.4.5-1.2 0-1.7z"></path></svg>',
                on: {
                    click: function() {
                        document.querySelector('.satus-main__container').close();
                    }
                }
            },
            title: {
                type: 'text',
                class: 'satus-header__title',
                innerText: 'Night Mode'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            mode: {
                type: 'switch',
                icons: {
                    before: '<svg viewBox="0 0 16 16"><path d="M7.49 2a.5.5 0 0 0-.49.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5zM3.6 3.61a.5.5 0 0 0-.34.85l.7.71a.5.5 0 0 0 .86-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.37-.15zm7.77 0a.5.5 0 0 0-.33.15l-.71.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zM7.46 5a3 3 0 0 0-2.08 5.12 3 3 0 0 0 4.24-4.24A3 3 0 0 0 7.46 5zM2 7.5a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm10 0a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1zm-7.7 3.18a.5.5 0 0 0-.34.15l-.7.7a.5.5 0 1 0 .7.71l.71-.7a.5.5 0 0 0 .15-.36.5.5 0 0 0-.52-.5zm6.38 0a.5.5 0 0 0-.35.86l.7.7a.5.5 0 0 0 .71 0 .5.5 0 0 0 .15-.35.5.5 0 0 0-.15-.35l-.7-.71a.5.5 0 0 0-.36-.15zM7.48 12a.5.5 0 0 0-.48.5v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.51-.5z"/></svg>',
                    after: '<svg viewBox="0 0 16 16"><path d="M7.5 4A4.5 4.5 0 0 0 3 8.5 4.5 4.5 0 0 0 7.5 13a4.5 4.5 0 0 0 4.201-2.905 3.938 3.938 0 0 1-.826.092A3.938 3.938 0 0 1 6.937 6.25a3.938 3.938 0 0 1 .704-2.243A4.5 4.5 0 0 0 7.5 4z"/></svg>'
                },
                style: {
                    width: 'auto',
                    padding: '0',
                    background: 'transparent'
                },
                value: true
            }
        }
    }
};





var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            button_back: {
                type: 'button',
                class: 'satus-button--back',
                before: '<svg stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
                onclick: function() {
                    document.querySelector('.satus-main').back();
                }
            },
            title: {
                type: 'text',
                class: 'satus-text--title'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            button_vert: {
                type: 'button',
                icon: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="5.25" r="0.45"/><circle cx="12" cy="12" r="0.45"/><circle cx="12" cy="18.75" r="0.45"/></svg>',
                onClickRender: {
                    type: 'dialog',
                    class: 'satus-dialog--vertical-menu'
                }
            }
        }
    }
};