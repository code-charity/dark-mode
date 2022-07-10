/*--------------------------------------------------------------
>>> FILTERS
----------------------------------------------------------------
# Bluelight
# Filters
# Initialization
--------------------------------------------------------------*/

/*--------------------------------------------------------------
>>> BLUELIGHT
--------------------------------------------------------------*/

extension.bluelight = function (value) {
	if (
		extension.storage.get('power') !== false &&
		extension.storage.get('websites/' + extension.hostname + '/active') !== false &&
		value > 0
	) {
		if (!extension.bluelight.element) {
			var namespace = 'http://www.w3.org/2000/svg',
				svg = document.createElementNS(namespace, 'svg'),
				filter = document.createElementNS(namespace, 'filter'),
				matrix = document.createElementNS(namespace, 'feColorMatrix');

			if (matrix && matrix.values && matrix.values.baseVal) {
				var values = matrix.values.baseVal;
			} else {
				return;
			}

			svg.setAttributeNS(null, 'viewBox', '0 0 1 1');
			svg.setAttributeNS(null, 'version', '1.1');
			svg.setAttributeNS(null, 'id', 'dark-mode__bluelight');
			filter.setAttributeNS(null, 'id', 'dark-mode__bluelight-filter');
			matrix.setAttributeNS(null, 'type', 'matrix');

			for (var i = 0; i < 20; i++) {
				var number = svg.createSVGNumber();

				if (
					i === 0 ||
					i === 6 ||
					i === 12 ||
					i === 18
				) {
					number.value = 1;
				} else {
					number.value = 0;
				}

				values.appendItem(number);
			}

			svg.appendChild(filter);
			filter.appendChild(matrix);

			extension.bluelight.element = svg;
			extension.bluelight.values = values;

			document.documentElement.appendChild(svg);
		}

		extension.bluelight.values[12].value = 1 - value / 100;
	} else if (extension.bluelight.element) {
		extension.bluelight.element.remove();

		delete extension.bluelight.element;
	}
};


/*--------------------------------------------------------------
>>> FILTERS
--------------------------------------------------------------*/

extension.filters = function (changed) {
	var html = document.documentElement,
		theme = extension.storage.website.theme,
		bluelight = extension.storage.website.filters.bluelight,
		brightness = extension.storage.website.filters.brightness,
		contrast = extension.storage.website.filters.contrast,
		grayscale = extension.storage.website.filters.grayscale,
		style = '';

	if (
		extension.storage.get('power') !== false &&
		extension.storage.get('websites/' + extension.hostname + '/active') !== false
	) {
		if (theme === 'invert' && extension.websiteHasDarkTheme === false) {
			style = 'invert(1)';

			html.setAttribute('dm-invert-colors', 'true');

			extension.allowColors();
		} else {
			html.removeAttribute('dm-invert-colors');

			if (theme === 'dynamic' && extension.websiteHasDarkTheme === false && !extension.dynamicFilter.observer) {
				extension.dynamicFilter.activate();
			} else {
				extension.allowColors();
			}
		}

		if (changed === true && theme !== 'dynamic') {
			extension.dynamicFilter.deactivate();
		}

		if (bluelight > 0) {
			style += ' url(#dark-mode__bluelight-filter)';
		}

		if (brightness < 100) {
			style += ' brightness(' + brightness / 100 + ')';
		}

		if (contrast < 100) {
			style += ' contrast(' + contrast / 100 + ')';
		}

		if (grayscale > 0) {
			style += ' grayscale(' + grayscale / 100 + ')';
		}
	}

	extension.bluelight(bluelight);

	if (!extension.filters.element) {
		extension.filters.element = extension.styles.create();
	}

	extension.filters.element.textContent = 'html{filter:' + style + ' !important}';
};


/*--------------------------------------------------------------
>>> INITIALIZATION
--------------------------------------------------------------*/

extension.checkDefaultTheme = function () {
	if (extension.storage.website.theme === 'dynamic' && extension.websiteHasDarkTheme === false) {
		document.documentElement.removeAttribute('dm-default-theme');

		extension.websiteHasDarkTheme = false;

		return;
	}

	var colors = [],
		is_dark = false;

	extension.allowColors(false);

	function parse(element, depth, depth_limit) {
		depth++;

		for (var i = 0, l = element.children.length; i < l; i++) {
			var child = element.children[i],
				rect = child.getBoundingClientRect();

			if (
				rect.width >= document.body.offsetWidth &&
				rect.height >= window.innerHeight
			) {
				colors.push(satus.css(child, 'background-color'));
			}

			if (depth < depth_limit && child.children) {
				parse(child, depth, depth_limit);
			}
		}
	}

	setTimeout(function () {
		colors.push(satus.css(document.documentElement, 'background-color'));
		colors.push(satus.css(document.body, 'background-color'));

		parse(document.body, 0, 3);

		for (var i = 0, l = colors.length; i < l; i++) {
			var color = colors[i];

			if (satus.isString(color)) {
				var array = satus.color.stringToArray(color);

				if (satus.isArray(array) && (satus.isset(array[3]) === false || array[3] > 0.5)) {
					var hsl = satus.color.rgbToHsl(array);

					if (satus.isArray(hsl)) {
						if (hsl[2] < 50) {
							is_dark = true;
						}
					}
				}
			}
		}

		if (is_dark) {
			document.documentElement.setAttribute('dm-default-theme', 'dark');

			extension.websiteHasDarkTheme = true;
		}

		extension.allowColors();
	});
};

extension.events.on('extension-loaded', function () {
	extension.checkDefaultTheme();

	extension.filters();
});

extension.events.on('website-loaded', function () {
	extension.checkDefaultTheme();

	extension.filters();
});

extension.events.on('storage-changed', function () {
	extension.filters(true);
});

window.addEventListener('focus', function () {
	setTimeout(function () {
		extension.checkDefaultTheme();
		extension.filters();
	}, 125);
});