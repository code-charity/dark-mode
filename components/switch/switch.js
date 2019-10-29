/*-----------------------------------------------------------------------------
>>> «SWITCH» COMPONENT
-----------------------------------------------------------------------------*/

Satus.switch = function(object, key) {
    let element = document.createElement('div'),
        label = this.get('locale/' + object.label) || object.label || false,
        value = Satus.get((object.storage || '') + '/' + key);

    element.innerHTML = (label ? '<div class=label>' + label + '</div>' : '') +
        '<div class=container>' +
        ((object.icons || {}).before || '') + '<div class=track><div class=thumb></div></div>' + ((object.icons || {}).after || '') +
        '</div>';

    if (value === 'undefined' || value === null) {
        element.dataset.value = object.value || false;
    } else {
        element.dataset.value = value;
    }


    element.addEventListener('click', function(event) {
        if (this.dataset.value == 'true') {
            this.dataset.value = 'false';
        } else {
            this.dataset.value = 'true';
        }

        Satus.set((object.storage || '') + '/' + key, this.dataset.value === 'true');
    });

    return element;
};