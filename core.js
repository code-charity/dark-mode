/*-----------------------------------------------------------------------------
>>> SATUS CORE
-----------------------------------------------------------------------------*/

const Satus = new function() {
    let data = {},
        events = {};

    this.components = {};

    this.get = function(name, on) {
        let path,
            object = data;

        if (typeof name !== 'string') {
            return false;
        } else {
            path = name.split('/').filter(function(value) {
                return value != '';
            });
        }

        for (let i = 0, l = path.length; i < l; i++) {
            object = (object || {}).hasOwnProperty(path[i]) ? object[path[i]] : false;
        }

        if (on !== false) {
            Satus.trigger('get');
        }

        return object;
    };

    this.set = function(name, value, on) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = data;

        for (let i = 0, l = path.length; i < l; i++) {
            let key = path[i];

            if (i === l - 1) {
                object[key] = value;
            } else {
                if (!object.hasOwnProperty(key)) {
                    object[key] = {};
                }

                object = object[key];
            }
        }

        if (on !== false) {
            Satus.trigger('set');
        }
    };

    this.remove = function(name, on) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = data;

        for (let i = 0, l = path.length; i < l; i++)
            object = object[path[i]];

        if (on !== false) {
            Satus.trigger('remove');
        }
    };

    this.on = function(name, callback) {
        if (!events.hasOwnProperty(name)) {
            events[name] = [];
        }

        events[name].push(callback);
    };

    this.trigger = function(name, data) {
        if (events.hasOwnProperty(name)) {
            for (let i = 0, l = events[name].length; i < l; i++) {
                events[name][i](data);
            }
        }
    };
};

console.log(Satus);