/*-----------------------------------------------------------------------------
>>> «MAIN» COMPONENT
-----------------------------------------------------------------------------*/

Satus.components.main = function(object) {
    let element = document.createElement('main'),
        container = document.createElement('div');

    container.className = 'satus-main__container';

    element.appendChild(container);

    Satus.render(container, object);

    return element;
};