/*-----------------------------------------------------------------------------
>>> «MAIN» COMPONENT
-----------------------------------------------------------------------------*/

Satus.main = function(object) {
    let element = document.createElement('main'),
        container = document.createElement('div');

    container.className = 'satus-main__container';

    element.appendChild(container);

    this.render(container, object);

    return element;
};