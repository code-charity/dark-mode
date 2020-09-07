function update(container) {
    var self = (this === window ? document.querySelector('.satus-main') : this),
        item = self.history[self.history.length - 1],
        id = item.appearanceKey;

    if (!Satus.isset(container)) {
        container = document.querySelector('.satus-main__container');
    }
    
    document.querySelector('.satus-text--title').innerText = Satus.locale.getMessage(this.history[this.history.length - 1].label) || 'Dark Mode';

    document.body.dataset.appearance = id;
    container.dataset.appearance = id;
}
