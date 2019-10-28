/*-----------------------------------------------------------------------------
>>> «SATUS CORE» v2.0
-----------------------------------------------------------------------------*/

const Satus = {
    data: {},
    events: {},

    get: function(name, on) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = this.data;
        for (let i = 0, l = path.length; i < l; i++) {
            object = (object || {}).hasOwnProperty(path[i]) ? object[path[i]] : false;
        }

        if (on !== false)
            for (let i = 0, l = (this.events.get || []).length; i < l; i++)
                this.events.get[i](name);

        return object;
    },

    set: function(name, value, on) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = this.data;

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
            for (let i = 0, l = (this.events.set || []).length; i < l; i++) {
                this.events.set[i](name, value);
            }
        }
    },

    remove: function(name, on) {
        let path = (name || '').split('/').filter(function(value) {
                return value != '';
            }),
            object = this.data;

        for (let i = 0, l = path.length; i < l; i++)
            object = object[path[i]];

        if (on !== false)
            for (let i = 0, l = (this.events.remove || []).length; i < l; i++)
                this.events.remove[i](name);
    },

    on: function(name, callback) {
        if (!this.events[name])
            this.events[name] = [];

        this.events[name].push(callback);
    }
};