/*--------------------------------------------------------------
>>> DYNAMIC THEME
----------------------------------------------------------------
# Global variable
# Parsers
	# Mutations
	# Children
	# Rules
	# Properties
	# Color
	# Value
# Other functions
# Activate
# Message listener
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

extension.dynamicFilter = {
	queue: {
		attributes: {
			style: [],
			bgcolor: [],
			color: []
		},
		link: [],
		style: []
	},
	status: false,
	indexes: [],
	styles: {},
	elements: {},
	values: {},
	threads: 0,
	color_keywords: {
		aliceblue: [0.5777777777777778, 1, 0.9705882352941176],
		antiquewhite: [0.09523809523809519, 0.7777777777777779, 0.9117647058823529],
		aqua: [0.5, 1, 0.5],
		aquamarine: [0.4440104166666667, 1, 0.7490196078431373],
		azure: [0.5, 1, 0.9705882352941176],
		beige: [0.16666666666666666, 0.555555555555556, 0.911764705882353],
		bisque: [0.09039548022598871, 1, 0.884313725490196],
		black: [0, 0, 0],
		blanchedalmond: [0.09999999999999994, 1, 0.9019607843137255],
		blue: [0.6666666666666666, 1, 0.5],
		blueviolet: [0.7531876138433516, 0.7593360995850621, 0.5274509803921569],
		brown: [0, 0.5942028985507247, 0.40588235294117647],
		burlywood: [0.09386973180076628, 0.5686274509803922, 0.7],
		cadetblue: [0.5051282051282051, 0.2549019607843137, 0.5],
		chartreuse: [0.2503267973856209, 1, 0.5],
		chocolate: [0.06944444444444443, 0.7499999999999999, 0.47058823529411764],
		coral: [0.04476190476190476, 1, 0.6568627450980392],
		cornflowerblue: [0.6070559610705596, 0.7919075144508672, 0.6607843137254902],
		cornsilk: [0.1333333333333333, 1, 0.9313725490196079],
		crimson: [0.9666666666666667, 0.8333333333333335, 0.47058823529411764],
		cyan: [0.5, 1, 0.5],
		darkblue: [0.6666666666666666, 1, 0.2725490196078431],
		darkcyan: [0.5, 1, 0.2725490196078431],
		darkgoldenrod: [0.11849710982658958, 0.8871794871794872, 0.38235294117647056],
		darkgray: [0, 0, 0.6627450980392157],
		darkgreen: [0.3333333333333333, 1, 0.19607843137254902],
		darkgrey: [0, 0, 0.6627450980392157],
		darkkhaki: [0.15447154471544713, 0.38317757009345804, 0.5803921568627451],
		darkmagenta: [0.8333333333333334, 1, 0.2725490196078431],
		darkolivegreen: [0.22777777777777777, 0.3896103896103896, 0.3019607843137255],
		darkorange: [0.09150326797385622, 1, 0.5],
		darkorchid: [0.7781385281385281, 0.6062992125984252, 0.4980392156862745],
		darkred: [0, 1, 0.2725490196078431],
		darksalmon: [0.042042042042042045, 0.7161290322580643, 0.696078431372549],
		darkseagreen: [0.3333333333333333, 0.2513966480446928, 0.6490196078431373],
		darkslateblue: [0.6901709401709403, 0.3899999999999999, 0.39215686274509803],
		darkslategray: [0.5, 0.25396825396825395, 0.24705882352941178],
		darkslategrey: [0.5, 0.25396825396825395, 0.24705882352941178],
		darkturquoise: [0.5023923444976076, 1, 0.40980392156862744],
		darkviolet: [0.783570300157978, 1, 0.4137254901960784],
		deeppink: [0.9099290780141844, 1, 0.5392156862745098],
		deepskyblue: [0.5418300653594771, 1, 0.5],
		dimgray: [0, 0, 0.4117647058823529],
		dimgrey: [0, 0, 0.4117647058823529],
		dodgerblue: [0.5822222222222222, 1, 0.5588235294117647],
		firebrick: [0, 0.679245283018868, 0.4156862745098039],
		floralwhite: [0.11111111111111101, 1, 0.9705882352941176],
		forestgreen: [0.3333333333333333, 0.6069364161849712, 0.33921568627450976],
		fuchsia: [0.8333333333333334, 1, 0.5],
		gainsboro: [0, 0, 0.8627450980392157],
		ghostwhite: [0.6666666666666666, 1, 0.9862745098039216],
		gold: [0.14052287581699346, 1, 0.5],
		goldenrod: [0.11917562724014337, 0.744, 0.49019607843137253],
		gray: [0, 0, 0.5019607843137255],
		green: [0.3333333333333333, 1, 0.25098039215686274],
		greenyellow: [0.23237179487179485, 1, 0.592156862745098],
		grey: [0, 0, 0.5019607843137255],
		honeydew: [0.33, 1, 0.97],
		hotpink: [0.9166666666666666, 1, 0.7058823529411764],
		indianred: [0, 0.5305164319248827, 0.5823529411764706],
		indigo: [0.7628205128205128, 1, 0.2549019607843137],
		ivory: [0.16666666666666666, 1, 0.9705882352941176],
		khaki: [0.15, 0.7692307692307692, 0.7450980392156863],
		lavender: [0.6666666666666666, 0.6666666666666666, 0.9411764705882353],
		lavenderblush: [0.9444444444444443, 1, 0.9705882352941176],
		lawngreen: [0.25132275132275134, 1, 0.49411764705882355],
		lemonchiffon: [0.14999999999999997, 1, 0.9019607843137255],
		lightblue: [0.5409356725146198, 0.5327102803738316, 0.7901960784313726],
		lightcoral: [0, 0.7887323943661971, 0.7215686274509804],
		lightcyan: [0.5, 1, 0.9392156862745098],
		lightgoldenrodyellow: [0.16666666666666666, 0.8000000000000002, 0.9019607843137254],
		lightgray: [0, 0, 0.8274509803921568],
		lightgreen: [0.3333333333333333, 0.734375, 0.7490196078431373],
		lightgrey: [0, 0, 0.8274509803921568],
		lightpink: [0.9748858447488584, 1, 0.8568627450980393],
		lightsalmon: [0.047619047619047616, 1, 0.7392156862745098],
		lightseagreen: [0.49086757990867574, 0.6952380952380952, 0.4117647058823529],
		lightskyblue: [0.563768115942029, 0.92, 0.7549019607843137],
		lightslategray: [0.5833333333333334, 0.14285714285714285, 0.5333333333333333],
		lightslategrey: [0.5833333333333334, 0.14285714285714285, 0.5333333333333333],
		lightsteelblue: [0.5942028985507246, 0.41071428571428575, 0.7803921568627451],
		lightyellow: [0.16666666666666666, 1, 0.9392156862745098],
		lime: [0.3333333333333333, 1, 0.5],
		limegreen: [0.3333333333333333, 0.607843137254902, 0.5],
		linen: [0.08333333333333333, 0.6666666666666666, 0.9411764705882353],
		magenta: [0.8333333333333334, 1, 0.5],
		maroon: [0, 1, 0.25098039215686274],
		mediumaquamarine: [0.4433656957928802, 0.5073891625615764, 0.6019607843137256],
		mediumblue: [0.6666666666666666, 1, 0.4019607843137255],
		mediumorchid: [0.8002645502645502, 0.5887850467289718, 0.580392156862745],
		mediumpurple: [0.721183800623053, 0.5977653631284916, 0.6490196078431372],
		mediumseagreen: [0.4075630252100841, 0.49790794979079495, 0.46862745098039216],
		mediumslateblue: [0.6902985074626865, 0.7976190476190477, 0.6705882352941177],
		mediumspringgreen: [0.436, 1, 0.49019607843137253],
		mediumturquoise: [0.49391727493917276, 0.5982532751091703, 0.5509803921568628],
		mediumvioletred: [0.8951310861423222, 0.809090909090909, 0.43137254901960786],
		midnightblue: [0.6666666666666666, 0.635036496350365, 0.26862745098039215],
		mintcream: [0.41666666666666646, 1, 0.9803921568627452],
		mistyrose: [0.01666666666666676, 1, 0.9411764705882353],
		moccasin: [0.10585585585585587, 1, 0.8549019607843138],
		navajowhite: [0.09959349593495935, 1, 0.8392156862745098],
		navy: [0.6666666666666666, 1, 0.25098039215686274],
		oldlace: [0.10869565217391304, 0.8518518518518523, 0.9470588235294117],
		olive: [0.16666666666666666, 1, 0.25098039215686274],
		olivedrab: [0.22118380062305296, 0.6045197740112994, 0.34705882352941175],
		orange: [0.10784313725490197, 1, 0.5],
		orangered: [0.045098039215686274, 1, 0.5],
		orchid: [0.8396226415094339, 0.5888888888888889, 0.6470588235294117],
		palegoldenrod: [0.15196078431372548, 0.6666666666666667, 0.8],
		palegreen: [0.3333333333333333, 0.9252336448598131, 0.7901960784313725],
		paleturquoise: [0.5, 0.6494845360824743, 0.8098039215686275],
		palevioletred: [0.9454828660436138, 0.5977653631284916, 0.6490196078431372],
		papayawhip: [0.10317460317460315, 1, 0.9176470588235295],
		peachpuff: [0.07857142857142856, 1, 0.8627450980392157],
		peru: [0.08215962441314555, 0.5867768595041323, 0.5254901960784314],
		pink: [0.970899470899471, 1, 0.8764705882352941],
		plum: [0.8333333333333334, 0.4728682170542637, 0.7470588235294118],
		powderblue: [0.5185185185185185, 0.5192307692307692, 0.7960784313725491],
		purple: [0.8333333333333334, 1, 0.25098039215686274],
		rebeccapurple: [0.75, 0.49999999999999994, 0.4],
		red: [0, 1, 0.5],
		rosybrown: [0, 0.2513966480446928, 0.6490196078431373],
		royalblue: [0.625, 0.7272727272727272, 0.5686274509803921],
		saddlebrown: [0.06944444444444443, 0.759493670886076, 0.3098039215686274],
		salmon: [0.017156862745098034, 0.9315068493150683, 0.7137254901960784],
		sandybrown: [0.07657657657657659, 0.8705882352941179, 0.6666666666666667],
		seagreen: [0.4068100358422939, 0.5027027027027026, 0.3627450980392157],
		seashell: [0.0686274509803922, 1, 0.9666666666666667],
		sienna: [0.05362318840579711, 0.5609756097560975, 0.4019607843137255],
		silver: [0, 0, 0.7529411764705882],
		skyblue: [0.5483333333333333, 0.714285714285714, 0.7254901960784313],
		slateblue: [0.6898550724637681, 0.5348837209302326, 0.5784313725490197],
		slategray: [0.5833333333333334, 0.12598425196850394, 0.5019607843137255],
		slategrey: [0.5833333333333334, 0.12598425196850394, 0.5019607843137255],
		snow: [0, 1, 0.9901960784313726],
		springgreen: [0.41633986928104577, 1, 0.5],
		steelblue: [0.5757575757575758, 0.44, 0.4901960784313726],
		tan: [0.09523809523809527, 0.4374999999999999, 0.6862745098039216],
		teal: [0.5, 1, 0.25098039215686274],
		thistle: [0.8333333333333334, 0.24271844660194178, 0.7980392156862746],
		tomato: [0.025362318840579712, 1, 0.6392156862745098],
		turquoise: [0.48333333333333334, 0.7207207207207207, 0.5647058823529412],
		violet: [0.8333333333333334, 0.7605633802816902, 0.7215686274509804],
		wheat: [0.1085858585858586, 0.7674418604651168, 0.8313725490196078],
		white: [0, 0, 1],
		whitesmoke: [0, 0, 0.9607843137254902],
		yellow: [0.16666666666666666, 1, 0.5],
		yellowgreen: [0.22150537634408604, 0.607843137254902, 0.5]
	},
	regex: {
		url: /url\((('.+?')|(".+?")|([^\)]*?))\)/g,
		rgb: /(#[A-Za-z0-9]+)|(rgba?\([^)]+\))|(-?-?\b[a-z-]+)/g,
		hex: /[A-Za-z0-9]{3,6}/g,
		num: /[0-9.]+/g,
		url_origin: /[^/]+\/\/[^/]+/
	}
};


/*--------------------------------------------------------------
# COLOR CONVERTERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# HUE TO RGB
--------------------------------------------------------------*/

extension.dynamicFilter.hueToRgb = function (t1, t2, hue) {
	if (hue < 0) {
		hue += 6;
	}

	if (hue >= 6) {
		hue -= 6;
	}

	if (hue < 1) {
		return (t2 - t1) * hue + t1;
	} else if (hue < 3) {
		return t2;
	} else if (hue < 4) {
		return (t2 - t1) * (4 - hue) + t1;
	} else {
		return t1;
	}
};


/*--------------------------------------------------------------
# STYLE TO RGB
--------------------------------------------------------------*/

extension.dynamicFilter.styleToRgb = function (string) {
	var match = string.match(extension.dynamicFilter.regex.num);

	if (match) {
		for (var i = 0, l = match.length; i < l; i++) {
			match[i] = parseFloat(match[i]);
		}
	}

	return match;
};


/*--------------------------------------------------------------
# HEX TO RGB
--------------------------------------------------------------*/

extension.dynamicFilter.hexToRgb = function (string) {
	var hex = string.slice(1),
		rgb = [];

	if (hex.length === 3) {
		for (var i = 0, l = hex.length; i < l; i++) {
			var character = hex.substr(i, 1);

			character += character;

			rgb.push(parseInt(character, 16));
		}
	}

	if (hex.length === 4) {
		for (var i = 0, l = hex.length - 1; i < l; i++) {
			var character = hex.substr(i, 1);

			character += character;

			rgb.push(parseInt(character, 16));
		}

		var character = hex.substr(3, 1);

		character += character;

		rgb.push(parseInt(character, 16) / 255);
	}

	if (hex.length === 6) {
		for (var i = 0, l = hex.length / 2; i < l; i++) {
			rgb.push(parseInt(hex.substr(i * 2, 2), 16));
		}
	}

	if (hex.length === 8) {
		for (var i = 0, l = hex.length / 2 - 1; i < l; i++) {
			rgb.push(parseInt(hex.substr(i * 2, 2), 16));
		}

		rgb.push(parseInt(hex.substr(6, 2), 16) / 255);
	}

	return rgb;
};


/*--------------------------------------------------------------
# RGB TO HSL
--------------------------------------------------------------*/

extension.dynamicFilter.rgbToHsl = function (array) {
	var r = array[0] / 255,
		g = array[1] / 255,
		b = array[2] / 255,
		max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		h,
		s,
		l = (min + max) / 2;

	if (min === max) {
		h = 0;
		s = 0;
	} else {
		var delta = max - min;

		s = l <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

		if (max === r) {
			h = (g - b) / delta + (g < b ? 6 : 0);
		} else if (max === g) {
			h = (b - r) / delta + 2;
		} else if (max === b) {
			h = (r - g) / delta + 4;
		}

		h /= 6;
	}

	if (array.length === 3) {
		return [h, s, l];
	} else {
		return [h, s, l, array[3]];
	}
};


/*--------------------------------------------------------------
# HSL TO STYLE
--------------------------------------------------------------*/

extension.dynamicFilter.hslToStyle = function (array) {
	if (array.length === 3) {
		return 'hsl(' + (array[0] * 360).toFixed(0) + 'deg,' + (array[1] * 100).toFixed(0) + '%,' + (array[2] * 100).toFixed(0) + '%)';
	} else {
		return 'hsla(' + (array[0] * 360).toFixed(0) + 'deg,' + (array[1] * 100).toFixed(0) + '%,' + (array[2] * 100).toFixed(0) + '%,' + array[3] + ')';
	}
};


/*--------------------------------------------------------------
# HSL TO RGB
--------------------------------------------------------------*/

extension.dynamicFilter.hslToRgb = function (array) {
	var hue = array[0] * 360,
		saturation = array[1],
		lightness = array[2],
		t1,
		t2;

	if (lightness <= .5) {
		t2 = lightness * (saturation + 1);
	} else {
		t2 = lightness + saturation - (lightness * saturation);
	}

	t1 = lightness * 2 - t2;
	r = extension.dynamicFilter.hueToRgb(t1, t2, hue + 2) * 255;
	g = extension.dynamicFilter.hueToRgb(t1, t2, hue) * 255;
	b = extension.dynamicFilter.hueToRgb(t1, t2, hue - 2) * 255;

	return 'rgb(' + r + ',' + g + ',' + b + ')';
};


/*--------------------------------------------------------------
# COLOR MODIFIERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# BACKGROUND
--------------------------------------------------------------*/

extension.dynamicFilter.modifyBackgroundColor = function (value, convert = true) {
	var hue = value[0],
		saturation = value[1],
		lightness = value[2];

	if (lightness < .5) {
		if (saturation < .12 || (lightness > .8 && hue > .55 && hue < .77)) {
			value[0] = .61;
			value[1] = .1;
			value[2] = extension.dynamicFilter.scale(lightness, 0, .5, 0, .4);
		} else {
			value[2] = extension.dynamicFilter.scale(lightness, 0, .5, 0, .4);
		}
	} else if (saturation < .12 || (lightness > .8 && hue > .55 && hue < .77)) {
		value[0] = .61;
		value[1] = .1;
		value[2] = extension.dynamicFilter.scale(lightness, .5, 1, .4, .1);
	} else {
		if (hue > .16 && hue < .5) {
			if (hue > .33) {
				value[0] = extension.dynamicFilter.scale(hue, .33, .5, .37, .5);
			} else {
				value[0] = extension.dynamicFilter.scale(hue, .16, .33, .16, .29);
			}
		}

		value[2] = extension.dynamicFilter.scale(lightness, .5, 1, .4, .1);
	}

	if (convert === true) {
		return extension.dynamicFilter.hslToStyle(value);
	} else {
		return value;
	}
};


/*--------------------------------------------------------------
# BORDER
--------------------------------------------------------------*/

extension.dynamicFilter.modifyBorderColor = function (value) {
	var hue = value[0],
		saturation = value[1],
		lightness = value[2];

	if (lightness < .2 || saturation < .24) {
		if (lightness < .5) {
			value[0] = .61;
			value[1] = .1;
		} else {
			value[0] = .61;
			value[1] = .1;
		}
	}

	value[2] = extension.dynamicFilter.scale(lightness, 0, 1, .5, .2);

	return extension.dynamicFilter.hslToStyle(value);
};


/*--------------------------------------------------------------
# TEXT
--------------------------------------------------------------*/

extension.dynamicFilter.modifyTextColor = function (value) {
	var hue = value[0],
		saturation = value[1],
		lightness = value[2];

	if (lightness > 0.5) {
		if (lightness < 0.2 || saturation < 0.24) {
			value[0] = 0;
			value[1] = 0;
			value[2] = extension.dynamicFilter.scale(lightness, 0.5, 1, 0.55, 0.75);
		} else if ((lightness >= 0.2 || saturation >= 0.24) && hue > 0.56 && hue < 0.68) {
			value[0] = extension.dynamicFilter.scale(hue, 0.56, 0.68, 0.56, 0.62);
			value[2] = extension.dynamicFilter.scale(lightness, 0.5, 1, 0.55, 0.75);
		} else {
			value[2] = extension.dynamicFilter.scale(lightness, 0.5, 1, 0.55, 0.75);
		}
	} else if (lightness < 0.2 || saturation < 0.24) {
		value[0] = 0;
		value[1] = 0;
		value[2] = extension.dynamicFilter.scale(lightness, 0, 0.5, 0.75, 0.55);
	} else if ((lightness >= 0.2 || saturation >= 0.24) && hue > 0.56 && hue < 0.68) {
		value[0] = extension.dynamicFilter.scale(hue, 0.56, 0.68, 0.56, 0.62);
		value[2] = extension.dynamicFilter.scale(lightness, 0, 0.5, 0.75, Math.min(1, 0.55 + 0.05));
	} else {
		value[2] = extension.dynamicFilter.scale(lightness, 0, 0.5, 0.75, 0.55);
	}

	return extension.dynamicFilter.hslToStyle(value);
};


/*--------------------------------------------------------------
# ATTRIBUTE HANDLERS
--------------------------------------------------------------*/

extension.dynamicFilter.attribute = function (node) {

};


/*--------------------------------------------------------------
# ATTRIBUTE <* STYLE="..."></*>
--------------------------------------------------------------*/

extension.dynamicFilter.attributeStyle = function (node) {
	if (typeof node.className === 'string' && node.className.indexOf('attribute') === -1) {
		node.className += ' dark-mode--attribute';

		node.setAttribute('dm-old-style', node.getAttribute('style'));
		node.setAttribute('style', extension.dynamicFilter.parseProperties(undefined, node.style, true));
	}
};


/*--------------------------------------------------------------
# ATTRIBUTE <* BGCOLOR="..."></*>
--------------------------------------------------------------*/

extension.dynamicFilter.attributeBgColor = function (node) {
	if (typeof node.className === 'string' && node.className.indexOf('bgcolor') === -1) {
		var value = node.getAttribute('bgcolor'),
			match = value.match(extension.dynamicFilter.regex.rgb);

		node.className += ' dark-mode--bgcolor';

		if (match) {
			for (var i = 0, l = match.length; i < l; i++) {
				var color = parseColor(match[i]);

				if (color) {
					value = value.replace(match[i], extension.dynamicFilter.modifyBackgroundColor(color));
				}
			}
		} else {
			var match = value.match(extension.dynamicFilter.regex.hex);

			if (match) {
				value = extension.dynamicFilter.hslToRgb(extension.dynamicFilter.modifyBackgroundColor(extension.dynamicFilter.rgbToHsl(extension.dynamicFilter.hexToRgb('#' + match[0])), false));
			}
		}

		node.setAttribute('dm-old-bgcolor', node.getAttribute('bgcolor'));
		node.setAttribute('bgcolor', value);
	}
};


/*--------------------------------------------------------------
# ATTRIBUTE <* COLOR="..."></*>
--------------------------------------------------------------*/

extension.dynamicFilter.attributeColor = function (node) {
	if (typeof node.className === 'string' && node.className.indexOf('color') === -1) {
		var value = node.getAttribute('color'),
			match = value.match(extension.dynamicFilter.regex.rgb);

		node.className += ' dark-mode--color';

		if (match) {
			for (var i = 0, l = match.length; i < l; i++) {
				var color = extension.dynamicFilter.parseColor(match[i]);

				if (color) {
					value = value.replace(match[i], extension.dynamicFilter.modifyTextColor(color));
				}
			}
		} else {
			var match = value.match(extension.dynamicFilter.regex.hex);

			if (match) {
				value = extension.dynamicFilter.hslToRgb(extension.dynamicFilter.modifyTextColor(extension.dynamicFilter.rgbToHsl(extension.dynamicFilter.hexToRgb('#' + match[0])), false));
			}
		}

		node.setAttribute('dm-old-color', node.getAttribute('color'));
		node.setAttribute('color', value);
	}
};


/*--------------------------------------------------------------
# ELEMENT HANDLERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# ELEMENT <LINK REL=STYLESHEET HREF="...">
--------------------------------------------------------------*/

extension.dynamicFilter.elementLink = function (type, node) {
	if (type === 1) {
		extension.dynamicFilter.indexes.push(node);

		chrome.runtime.sendMessage({
			action: 'fetch',
			url: node.href,
			index: extension.dynamicFilter.indexes.length - 1
		});

		extension.dynamicFilter.threads++;
	} else if (type === -1) {
		var index = extension.dynamicFilter.indexes.indexOf(node);

		if (index !== -1) {
			extension.dynamicFilter.indexes.splice(index, 1);

			if (extension.dynamicFilter.styles[index]) {
				delete extension.dynamicFilter.styles[index];
			}
		}
	}
};


/*--------------------------------------------------------------
# ELEMENT <STYLE>...</STYLE>
--------------------------------------------------------------*/

extension.dynamicFilter.elementStyle = function (type, node) {
	if (type === 1) {
		if (node.sheet && node.className.indexOf('dark-mode') === -1) {
			extension.dynamicFilter.indexes.push(node);

			extension.dynamicFilter.createStyle(extension.dynamicFilter.parseRules(node.sheet.cssRules), node.parentNode);
		}
	} else if (type === -1) {
		var index = extension.dynamicFilter.indexes.indexOf(node);

		if (index !== -1) {
			extension.dynamicFilter.indexes.splice(index, 1);

			if (extension.dynamicFilter.styles[index]) {
				delete extension.dynamicFilter.styles[index];
			}
		}
	}
};


/*--------------------------------------------------------------
# PARSERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# MUTATIONS
--------------------------------------------------------------*/

extension.dynamicFilter.parseMutations = function (mutationList) {
	for (var i = 0, l = mutationList.length; i < l; i++) {
		var mutation = mutationList[i];

		if (mutation.type === 'childList') {
			for (var j = 0, k = mutation.addedNodes.length; j < k; j++) {
				extension.dynamicFilter.parseChildren(1, mutation.addedNodes[j]);
			}

			for (var j = 0, k = mutation.removedNodes.length; j < k; j++) {
				extension.dynamicFilter.parseChildren(-1, mutation.removedNodes[j]);
			}
		} else if (mutation.type === 'attributes') {
			if (mutation.attributeName === 'style') {
				if (extension.dynamicFilter.dynamic_theme) {
					extension.dynamicFilter.attributeStyle(mutation.target);
				} else {
					extension.dynamicFilter.queue.attributes.style.push(mutation.target);
				}
			} else if (mutation.attributeName === 'bgcolor') {
				if (extension.dynamicFilter.dynamic_theme) {
					extension.dynamicFilter.attributeBgColor(mutation.target);
				} else {
					extension.dynamicFilter.queue.attributes.style.push(mutation.target);
				}
			} else if (mutation.attributeName === 'color') {
				if (extension.dynamicFilter.dynamic_theme) {
					extension.dynamicFilter.attributeColor(mutation.target);
				} else {
					extension.dynamicFilter.queue.attributes.style.push(mutation.target);
				}
			}
		}
	}
};


/*--------------------------------------------------------------
# CHILDREN
--------------------------------------------------------------*/

extension.dynamicFilter.parseChildren = function (type, node) {
	var children = node.children;

	if (node.nodeName === 'LINK') {
		if (node.rel.toLowerCase() === 'stylesheet') {
			if (extension.dynamicFilter.dynamic_theme) {
				extension.dynamicFilter.elementLink(type, node);
			} else if (type === 1) {
				extension.dynamicFilter.queue.link.push(node);
			}
		}
	} else if (node.nodeName === 'STYLE') {
		if (extension.dynamicFilter.dynamic_theme) {
			extension.dynamicFilter.elementStyle(type, node);
		} else if (type === 1) {
			extension.dynamicFilter.queue.style.push(node);
		}
	} else if (node.nodeType === 1 && node.hasAttribute) {
		if (node.hasAttribute('style')) {
			if (extension.dynamicFilter.dynamic_theme) {
				extension.dynamicFilter.attributeStyle(node);
			} else {
				extension.dynamicFilter.queue.attributes.style.push(node);
			}
		} else if (node.hasAttribute('bgcolor')) {
			if (extension.dynamicFilter.dynamic_theme) {
				extension.dynamicFilter.attributeBgColor(node);
			} else {
				extension.dynamicFilter.queue.attributes.bgcolor.push(node);
			}
		} else if (node.hasAttribute('color')) {
			if (extension.dynamicFilter.dynamic_theme) {
				extension.dynamicFilter.attributeColor(node);
			} else {
				extension.dynamicFilter.queue.attributes.color.push(node);
			}
		}
	}

	if (children) {
		for (var i = 0, l = children.length; i < l; i++) {
			extension.dynamicFilter.parseChildren(type, children[i]);
		}
	}
};


/*--------------------------------------------------------------
# RULES
--------------------------------------------------------------*/

extension.dynamicFilter.parseRules = function (rules, parent, url) {
	var string = '';

	for (var i = 0, l = rules.length; i < l; i++) {
		var rule = rules[i];

		if (rule instanceof CSSMediaRule) {
			var media = rule.media.mediaText;

			if (
				media.includes('all') ||
				media.includes('screen') ||
				!(
					media.includes('print') ||
					media.includes('speech')
				)
			) {
				var result = extension.dynamicFilter.parseRules(rule.cssRules, '@media ' + rule.media.mediaText);

				if (result.length > 0) {
					string += '@media ' + rule.media.mediaText + '{' + result + '}';
				}
			}
		} else if (rule instanceof CSSImportRule) {
			if (rule.styleSheet) {
				chrome.runtime.sendMessage({
					action: 'fetch',
					url: rule.styleSheet.href
				});
			}
		} else if (rule instanceof CSSStyleRule) {
			var properties = extension.dynamicFilter.parseProperties(rule.selectorText, rule.style, false, parent);

			if (properties.length > 0) {
				string += rule.selectorText + '{' + properties + '}';
			}
		} else if (rule instanceof CSSSupportsRule) {
			if (CSS.supports(rule.conditionText)) {
				var result = extension.dynamicFilter.parseRules(rule.cssRules);

				if (result.length > 0) {
					string += result;
				}
			}
		}
	}

	if (url) {
		string = string.replace(extension.dynamicFilter.regex.url, function (match) {
			var result = match.replace(/url\(["']?/, '').replace(/["']?\)$/, '');

			if (result.indexOf('data:') === 0) {
				return match;
			} else {
				var match = url.match(extension.dynamicFilter.regex.url_origin, '');

				if (match) {
					return 'url("' + match[0] + result + '")';
				}
			}
		});
	}

	return string;
};


/*--------------------------------------------------------------
# PROPERTIES
--------------------------------------------------------------*/

extension.dynamicFilter.parseProperties = function (selector, properties, is_inline, parent) {
	var string = '';


	for (var i = 0, l = properties.length; i < l; i++) {
		var property = properties[i];

		if (
			property === 'background-color' ||
			property === 'background-image'
		) {
			var value = properties.getPropertyValue(property),
				priority = properties.getPropertyPriority(property);

			string += property + ':' + extension.dynamicFilter.parseValue(selector, property, value, extension.dynamicFilter.modifyBackgroundColor);

			if (priority) {
				string += ' !important';
			}

			string += ';';
		} else if (
			property === 'color' ||
			property === 'fill' ||
			property === 'stroke' ||
			property === 'stop-color'
		) {
			var value = properties.getPropertyValue(property),
				priority = properties.getPropertyPriority(property);

			string += property + ':' + extension.dynamicFilter.parseValue(selector, property, value, extension.dynamicFilter.modifyTextColor);

			if (priority) {
				string += ' !important';
			}

			string += ';';
		} else if (
			property === 'border-top-color' ||
			property === 'border-right-color' ||
			property === 'border-bottom-color' ||
			property === 'border-left-color' ||
			property === 'outline-color'
		) {
			var value = properties.getPropertyValue(property),
				priority = properties.getPropertyPriority(property);

			string += property + ':' + extension.dynamicFilter.parseValue(selector, property, value, extension.dynamicFilter.modifyBorderColor);

			if (priority) {
				string += ' !important';
			}

			string += ';';
		} else if (property === 'box-shadow') {
			var value = properties.getPropertyValue(property),
				priority = properties.getPropertyPriority(property);

			string += property + ':' + extension.dynamicFilter.parseValue(selector, property, value, extension.dynamicFilter.modifyBackgroundColor) + ';';

			if (priority) {
				string += ' !important';
			}

			string += ';';
		} else if (property.startsWith('--')) {
			/*var value = properties.getPropertyValue(property),
			    priority = properties.getPropertyPriority(property);

			if (!extension.dynamicFilter.variables.variables[property]) {
			    extension.dynamicFilter.variables.variables[property] = {};
			}

			if (!extension.dynamicFilter.variables.variables[property][value]) {
			    extension.dynamicFilter.variables.variables[property][value] = {};
			}

			extension.dynamicFilter.variables.variables[property][value][selector] = true;

			parseVariable(selector, property, value, true);*/
		} else if (is_inline) {
			var priority = properties.getPropertyPriority(property);

			string += property + ':' + properties.getPropertyValue(property);

			if (priority) {
				string += ' !important';
			}

			string += ';';
		}
	}

	return string;
};


/*--------------------------------------------------------------
# COLOR
--------------------------------------------------------------*/

extension.dynamicFilter.parseColor = function (value, property) {
	if (value.indexOf('rgb') === 0) {
		var array = extension.dynamicFilter.styleToRgb(value);

		if (array) {
			return extension.dynamicFilter.rgbToHsl(array);
		}
	} else if (value.indexOf('#') === 0) {
		return extension.dynamicFilter.rgbToHsl(extension.dynamicFilter.hexToRgb(value));
	} else if (extension.dynamicFilter.color_keywords[value]) {
		return extension.dynamicFilter.color_keywords[value];
	}
};


/*--------------------------------------------------------------
# VALUE
--------------------------------------------------------------*/

extension.dynamicFilter.parseValue = function (selector, property, value, modifier) {
	var match = value.match(extension.dynamicFilter.regex.rgb);

	//parseVariable(selector, property, value, false);

	if (match) {
		for (var i = 0, l = match.length; i < l; i++) {
			var color = extension.dynamicFilter.parseColor(match[i], property);

			if (color) {
				value = value.replace(match[i], modifier(color));
			}
		}
	}

	return value;
};


/*--------------------------------------------------------------
# SELECTORS
--------------------------------------------------------------*/

extension.dynamicFilter.queryLinks = function () {
	var links = document.querySelectorAll('link[rel=stylesheet]:not(.dark-mode--stylesheet)');

	for (var i = 0, l = links.length; i < l; i++) {
		extension.dynamicFilter.elementLink(1, links[i]);
	}
};

extension.dynamicFilter.queryStyles = function () {
	var styles = document.querySelectorAll('style:not(.dark-mode--stylesheet)');

	for (var i = 0, l = styles.length; i < l; i++) {
		var style = styles[i];

		if (style.sheet) {
			extension.dynamicFilter.createStyle(extension.dynamicFilter.parseRules(style.sheet.cssRules), style.parentNode);
		}
	}
};

extension.dynamicFilter.queryInlines = function () {
	var success = false,
		elements = document.querySelectorAll('*[style]:not(.dark-mode--attribute)');

	for (var i = 0, l = elements.length; i < l; i++) {
		extension.dynamicFilter.attributeStyle(elements[i]);
	}

	if (elements.length > 0) {
		success = true;
	}

	var elements = document.querySelectorAll('*[bgcolor]:not(.dark-mode--bgcolor)');

	for (var i = 0, l = elements.length; i < l; i++) {
		extension.dynamicFilter.attributeBgColor(elements[i]);
	}

	if (elements.length > 0) {
		success = true;
	}

	var elements = document.querySelectorAll('*[color]:not(.dark-mode--color)');

	for (var i = 0, l = elements.length; i < l; i++) {
		extension.dynamicFilter.attributeColor(elements[i]);
	}

	if (elements.length > 0) {
		success = true;
	}

	return success;
};


/*--------------------------------------------------------------
# OTHER FUNCTIONS
--------------------------------------------------------------*/

extension.dynamicFilter.createStyle = function (content, parent, url) {
	var element = document.createElement('style');

	element.className = 'dark-mode--stylesheet';
	element.textContent = content;
	element.dataset.url = url;

	parent.appendChild(element);

	return element;
};

extension.dynamicFilter.scale = function (x, inLow, inHigh, outLow, outHigh) {
	return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
};


/*--------------------------------------------------------------
# ACTIVATE
--------------------------------------------------------------*/

extension.dynamicFilter.activate = function () {
	if (extension.dynamicFilter.status === false) {
		extension.dynamicFilter.status = true;

		document.documentElement.removeAttribute('dm-default-theme');

		extension.disallowColors();

		extension.dynamicFilter.queryLinks();
		extension.dynamicFilter.queryStyles();
		extension.dynamicFilter.queryInlines();

		extension.dynamicFilter.observer = new MutationObserver(extension.dynamicFilter.parseMutations);

		extension.dynamicFilter.observer.observe(document, {
			attributes: true,
			attributeFilter: [
				'bgcolor',
				'color',
				'fill',
				'stop-color',
				'stroke',
				'style'
			],
			childList: true,
			subtree: true
		});

		chrome.runtime.sendMessage({
			action: 'insert-user-agent-stylesheet'
		});
	}
};

extension.dynamicFilter.deactivate = function () {
	if (extension.dynamicFilter.status === true) {
		extension.dynamicFilter.status = false;

		var elements = {
				attribute: document.querySelectorAll('.dark-mode--attribute'),
				bgcolor: document.querySelectorAll('.dark-mode--bgcolor'),
				color: document.querySelectorAll('.dark-mode--color'),
				stylesheet: document.querySelectorAll('.dark-mode--stylesheet')
			};

		for (var i = 0, l = elements.attribute.length; i < l; i++) {
			var element = elements.attribute[i];

			element.classList.remove('dark-mode--attribute');
			element.setAttribute('style', element.getAttribute('dm-old-style'));
			element.removeAttribute('dm-old-style');
		}

		for (var i = 0, l = elements.bgcolor.length; i < l; i++) {
			var element = elements.bgcolor[i];

			element.classList.remove('dark-mode--bgcolor');
			element.setAttribute('bgcolor', element.getAttribute('dm-old-bgcolor'));
			element.removeAttribute('dm-old-bgcolor');
		}

		for (var i = 0, l = elements.color.length; i < l; i++) {
			var element = elements.color[i];

			element.classList.remove('dark-mode--color');
			element.setAttribute('color', element.getAttribute('dm-old-color'));
			element.removeAttribute('dm-old-color');
		}

		for (var i = 0, l = elements.stylesheet.length; i < l; i++) {
			elements.stylesheet[i].remove();
		}

		if (extension.dynamicFilter.observer) {
			extension.dynamicFilter.observer.disconnect();

			delete extension.dynamicFilter.observer;
		}

		chrome.runtime.sendMessage({
			action: 'remove-user-agent-stylesheet'
		});
	}
};


/*--------------------------------------------------------------
# MESSAGE LISTENER
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === 'fetch-response') {
		var style = extension.dynamicFilter.indexes[message.index],
			parent = document.head;

		if (style) {
			parent = style.parentNode;
		}

		var element = extension.dynamicFilter.createStyle(message.response, parent),
			rules = element.sheet.cssRules;

		extension.dynamicFilter.threads--;

		extension.dynamicFilter.createStyle(extension.dynamicFilter.parseRules(rules, null, message.url), parent, message.url);

		element.remove();

		if (extension.dynamicFilter.threads === 0) {
			extension.allowColors();
		}
	}
});