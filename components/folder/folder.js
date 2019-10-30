/*-----------------------------------------------------------------------------
>>> «FOLDER» COMPONENT
-----------------------------------------------------------------------------*/

Satus.components.folder = function(object, name) {
    let element = document.createElement('div'),
        label = document.createElement('span');

    if (typeof object.icon === 'string') {
        element.innerHTML = object.icon;
    }

    label.innerText = Satus.get('locale/' + object.label) || object.label || Satus.get('locale/' + name) || name;

    function create() {
        let container = document.createElement('div');

        container.className = 'satus-main__container';

        container.close = function() {
            let self = this,
                container = create(),
                object = Menu,
                path = document.querySelector('.satus').dataset.path.split('/').filter(function(value) {
                    return value != '';
                });

            if (this.parentNode.classList.contains('changing') || path.length === 1)
                return false;

            this.parentNode.classList.add('changing');

            path.pop();

            document.querySelector('.satus').dataset.path = path.join('/');

            for (let i = 0, l = path.length; i < l; i++) {
                object = object[path[i]];
            }

            Satus.render(container, object);

            self.dataset.status = 'pre-closing';
            container.dataset.status = 'pre-closing';
            self.parentNode.appendChild(container);

            if (
                typeof container.satusItem === 'object' &&
                typeof container.satusItem.on === 'object' &&
                typeof container.satusItem.on.render === 'function'
            )
                container.satusItem.on.render(container);

            setTimeout(function() {
                self.dataset.status = 'closing';
                container.dataset.status = 'closing';

                setTimeout(function() {
                    self.remove();
                    container.dataset.status = '';
                    container.parentNode.classList.remove('changing');
                }, Number(window.getComputedStyle(document.querySelector('.satus-main__container')).getPropertyValue('transition-duration').replace(/[^0-9.]/g, '')) * 1000);
            });
        };

        return container;
    }

    element.addEventListener('click', function() {
        if (this.parentNode.classList.contains('changing'))
            return false;

        this.parentNode.classList.add('changing');

        let container = create();

        element.parentNode.dataset.status = 'pre-opening';
        container.dataset.status = 'pre-opening';
        document.querySelector('.satus').dataset.path = (document.querySelector('.satus').dataset.path || 'main') + '/' + name;

        Satus.render(container, object);

        element.parentNode.parentNode.appendChild(container);

        if (
            typeof container.satusItem === 'object' &&
            typeof container.satusItem.on === 'object' &&
            typeof container.satusItem.on.render === 'function'
        )
            container.satusItem.on.render(container);

        setTimeout(function() {
            element.parentNode.dataset.status = 'opening';
            container.dataset.status = 'opening';

            setTimeout(function() {
                element.parentNode.remove();
                container.dataset.status = '';
                container.parentNode.classList.remove('changing');
            }, Number(window.getComputedStyle(document.querySelector('.satus-main__container')).getPropertyValue('transition-duration').replace(/[^0-9.]/g, '')) * 1000);
        });
    });

    element.appendChild(label);

    return element;
};