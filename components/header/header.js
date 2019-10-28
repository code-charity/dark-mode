/*-----------------------------------------------------------------------------
>>> «HEADER» COMPONENT
-----------------------------------------------------------------------------*/

Satus.header = function(object) {
    let element = document.createElement('header');

    this.render(element, object);

    return element;
};