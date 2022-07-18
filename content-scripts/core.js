/*--------------------------------------------------------------
>>> CORE
----------------------------------------------------------------
# Global variable
# Events
	# On
	# Trigger
# Storage
# Get
# Initialization
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

var extension = {
	events: {
		listeners: {}
	},
	ready: 0,
	storage: {
		data: {},
		website: {
			theme: 'invert',
			filters: {}
		}
	},
	hostname: location.hostname || location.href,
	websiteHasDarkTheme: false
};


/*--------------------------------------------------------------
# EVENTS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# ON
--------------------------------------------------------------*/

extension.events.on = function (type, listener, options = {}) {
	var listeners = extension.events.listeners;

	if (!listeners[type]) {
		listeners[type] = [];
	}

	if (options.async === true) {
		listener = (function (original) {
			return async function () {
				return new Promise(original);
			};
		})(listener);
	}

	if (options.prepend === true) {
		listeners[type].unshift(listener);
	} else {
		listeners[type].push(listener);
	}
};


/*--------------------------------------------------------------
# TRIGGER
--------------------------------------------------------------*/

extension.events.trigger = async function (type, data) {
	var listeners = extension.events.listeners[type];

	if (listeners) {
		for (var i = 0, l = listeners.length; i < l; i++) {
			var listener = listeners[i];

			if (satus.isFunction(listener)) {
				if (listener instanceof(async function () {}).constructor === true) {
					await listener(data);
				} else {
					listener(data);
				}
			}
		}
	}
};


/*--------------------------------------------------------------
# STORAGE
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GET
--------------------------------------------------------------*/

extension.storage.get = function (key) {
	var array = key.split('/'),
		target = extension.storage.data;

	for (var i = 0, l = array.length; i < l; i++) {
		var j = array[i];

		if (target[j] !== undefined) {
			target = target[j];

			if (i + 1 === l) {
				return target;
			}
		} else {
			return undefined;
		}
	}
};


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

extension.schedule = function () {
	extension.storage.website = {
		theme: 'invert',
		filters: {}
	};

	if (extension.schedule.interval) {
		clearInterval(extension.schedule.interval);
	}

	if (extension.storage.data.schedule === 'sunset_to_sunrise') {
		var start = Number((extension.storage.data.time_from || '00:00').substr(0, 2)),
			end = Number((extension.storage.data.time_to || '00:00').substr(0, 2)),
			current = new Date().getHours();

		if (end < start && current > start && current < 24) {
			end += 24;
		} else if (end < start && current < end) {
			start = 0;
		}

		if (current < start || current > end) {
			extension.schedule.interval = setInterval(extension.schedule, 1000 * 60);

			return false;
		}
	} else if (extension.storage.data.schedule === 'system_peference') {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches === false) {
			return false;
		}
	}

	if (extension.storage.get('websites/' + extension.hostname + '/separated') === true) {
		extension.storage.website.styles = extension.storage.get('websites/' + extension.hostname + '/styles');
		extension.storage.website.theme = extension.storage.get('websites/' + extension.hostname + '/theme') || 'invert';
		extension.storage.website.filters = extension.storage.get('websites/' + extension.hostname + '/filters') || {};
	} else {
		extension.storage.website.styles = extension.storage.get('styles');
		extension.storage.website.theme = extension.storage.get('theme') || 'invert';
		extension.storage.website.filters = extension.storage.get('filters') || {};
	}
};

extension.allowTransitions = function () {
	document.documentElement.setAttribute('dm-allow-transitions', '');
};

extension.allowColors = function (value) {
	document.documentElement.setAttribute('dm-allow-colors', '');
};

extension.disallowColors = function (value) {
	document.documentElement.removeAttribute('dm-allow-colors');
};

extension.init = function () {
	extension.ready++;

	if (extension.ready > 2) {
		extension.schedule();

		extension.events.trigger('extension-loaded');

		setTimeout(function () {
			extension.allowTransitions();
		});
	}
};

chrome.storage.local.get(function (items) {
	extension.storage.data = items;

	extension.events.trigger('storage-loaded');

	extension.init();
});

chrome.storage.onChanged.addListener(function (changes) {
	for (var key in changes) {
		var value = changes[key].newValue;

		extension.storage.data[key] = value;
	}

	extension.schedule();

	for (var key in changes) {
		var value = changes[key].newValue;

		extension.events.trigger('storage-changed', {
			key,
			value
		});
	}
});

chrome.runtime.sendMessage({
	action: 'tab-connected'
}, function (response) {
	if (response) {
		extension.hostname = response;
	}

	extension.init();
});

document.addEventListener('DOMContentLoaded', function () {
	extension.init();
});

window.addEventListener('load', function () {
	extension.events.trigger('website-loaded');
});