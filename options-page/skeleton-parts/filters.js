/*--------------------------------------------------------------
>>> FILTERS
----------------------------------------------------------------
# ???
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# 
--------------------------------------------------------------*/

skeleton.main.layers.section = {
	component: 'section',
	variant: 'card',

	theme: {
		component: 'select',
		text: 'theme',
		storage: function () {
			var prefix = 'websites/' + extension.hostname;

			if (satus.storage.get(prefix + '/separated') === true) {
				return prefix + '/theme';
			} else {
				return 'theme';
			}
		},
		options: [{
			text: 'invertColors',
			value: 'invert'
		}, {
			text: 'dynamicFilter',
			value: 'dynamic'
		}, {
			text: 'disabled',
			value: 'disabled'
		}]
	},
	brightness: {
		component: 'slider',
		variant: 'row',
		text: 'brightness',
		storage: function () {
			var prefix = 'websites/' + extension.hostname;

			if (satus.storage.get(prefix + '/separated') === true) {
				return prefix + '/filters/brightness';
			} else {
				return 'filters/brightness';
			}
		},
		max: 100,
		value: 100
	},
	contrast: {
		component: 'slider',
		variant: 'row',
		text: 'contrast',
		storage: function () {
			var prefix = 'websites/' + extension.hostname;

			if (satus.storage.get(prefix + '/separated') === true) {
				return prefix + '/filters/contrast';
			} else {
				return 'filters/contrast';
			}
		},
		max: 100,
		value: 100
	},
	grayscale: {
		component: 'slider',
		variant: 'row',
		text: 'grayscale',
		storage: function () {
			var prefix = 'websites/' + extension.hostname;

			if (satus.storage.get(prefix + '/separated') === true) {
				return prefix + '/filters/grayscale';
			} else {
				return 'filters/grayscale';
			}
		},
		max: 100
	},
	bluelight: {
		component: 'slider',
		variant: 'row',
		text: 'bluelight',
		storage: function () {
			var prefix = 'websites/' + extension.hostname;

			if (satus.storage.get(prefix + '/separated') === true) {
				return prefix + '/filters/bluelight';
			} else {
				return 'filters/bluelight';
			}
		},
		max: 100
	}
};