/*-----------------------------------------------------------------------------
>>> «HEADER» TEMPLATE
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
                class: 'satus-button--back',
                before: '<svg stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
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
                class: 'satus-switch--night-mode',
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

                    Satus.render(Menu, wrapper);

                    container.appendChild(wrapper);

                    container.querySelector('main').history = Object.assign(document.querySelector('main').history);

                    container.querySelector('main').open(container.querySelector('main').history[container.querySelector('main').history.length - 1], function() {}, false);

                    /*container.querySelector('main .satus-scrollbar__content').innerHTML = '';

                    var a = Object.assign(container.querySelector('main').history[container.querySelector('main').history.length - 1]);

                    delete a.type;

                    Satus.render(a, container.querySelector('main .satus-scrollbar__content'));*/

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
