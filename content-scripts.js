function getFilters(settings) {
    var string = '',
        html_filter = '',
        body_filter = '',
        body_child_filter = '';

    if (settings.bluelight > 0) {
        var bluelight = document.getElementById('night-mode-bluelight') || document.createElement('div');

        bluelight.id = 'night-mode-bluelight';
        bluelight.style.position = 'absolute';
        bluelight.style.visibility = 'hidden';
        bluelight.style.pointerEvents = 'none';
        bluelight.innerHTML = '<svg version="1.1" viewBox="0 0 1 1"><filter id="bluelight-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 ' + (1 - parseFloat(settings.bluelight) / 100) + ' 0 0 0 0 0 1 0"></feColorMatrix></filter></svg>';

        document.documentElement.appendChild(bluelight);

        html_filter += 'url(#bluelight-filter)';

        if (typeof settings.grayscale === 'number' && settings.grayscale > 0) {
            body_child_filter += ' grayscale(' + settings.grayscale + '%)';
        }
    } else if (document.getElementById('night-mode-bluelight')) {
        document.getElementById('night-mode-bluelight').remove();
    }

    if (!(settings.bluelight > 0)) {
        if (typeof settings.grayscale === 'number' && settings.grayscale > 0) {
            html_filter += ' grayscale(' + settings.grayscale + '%)';
        }
    }

    if (html_filter.length > 0) {
        string += 'html{-webkit-filter:' + html_filter + ';filter:' + html_filter + '}#night-mode-extension-brightness{filter:invert(1)}';
    }

    if (body_filter.length > 0) {
        string += 'body{-webkit-filter:' + body_filter + ';filter:' + body_filter + '}#night-mode-extension-brightness{filter:invert(1)}';
    }

    if (body_child_filter.length > 0) {
        string += 'body > *:not(#night-mode-extension-brightness){-webkit-filter:' + body_child_filter + ';filter:' + body_child_filter + '}';
    }

    return string;
}

function injectStyle(string, id, schedule) {
    var element = document.getElementById(id) || document.createElement('style');

    element.className = 'night-mode-extension-inject';

    if (id) {
        element.id = id;
    }

    if (schedule === 'system_peference') {
        element.textContent = '@media (prefers-color-scheme:dark){';
    }

    element.textContent += string;

    if (schedule === 'system_peference') {
        element.textContent += '}';
    }

    document.documentElement.appendChild(element);
}

function removeAll() {
    document.documentElement.classList.remove('dark-mode');

    if (document.querySelector('#night-mode-extension-filters')) {
        document.querySelector('#night-mode-extension-filters').remove();
    }

    if (document.querySelector('#night-mode-extension-global-styles')) {
        document.querySelector('#night-mode-extension-global-styles').remove();
    }

    if (document.querySelector('#night-mode-extension-styles')) {
        document.querySelector('#night-mode-extension-styles').remove();
    }

    if (document.querySelector('#night-mode-extension-brightness-styles')) {
        document.querySelector('#night-mode-extension-brightness-styles').remove();
    }

    if (document.querySelector('#night-mode-extension-contrast-styles')) {
        document.querySelector('#night-mode-extension-contrast-styles').remove();
    }
}

function update() {
    var schedule_time = {
            from: Number((settings.time_from || '00:00').substr(0, 2)),
            to: Number((settings.time_to || '00:00').substr(0, 2))
        },
        current_time = new Date().getHours(),
        enabled = false;

    if (schedule_time.to < schedule_time.from && current_time > schedule_time.from && current_time < 24) {
        schedule_time.to += 24;
    } else if (schedule_time.to < schedule_time.from && current_time < schedule_time.to) {
        schedule_time.from = 0;
    }

    if (settings.websites) {
        for (var key in settings.websites) {
            try {
                if (location.hostname.indexOf(key) !== -1 || new RegExp(key).test(location.href)) {
                    current_website = settings.websites[key];
                }
            } catch (err) {}
        }
    }

    for (var key in settings.websites) {
        if (settings.websites[key].enabled === true) {
            enabled = true;
        }
    }


    var sett = {};

    if (settings.websites && current_website && current_website.filters && (current_website.filters || {}).use_global === false) {
        sett = current_website.filters;
    }

    if (sett.invert_colors === undefined) {
        sett.invert_colors = settings.invert_colors;
    }

    if (sett.bluelight === undefined) {
        sett.bluelight = settings.bluelight;
    }

    if (sett.brightness === undefined) {
        sett.brightness = settings.brightness;
    }

    if (sett.contrast === undefined) {
        sett.contrast = settings.contrast;
    }

    if (sett.grayscale === undefined) {
        sett.grayscale = settings.grayscale;
    }


    if (
        settings.mode !== false &&
        (
            settings.schedule !== 'sunset_to_sunrise' ||
            current_time >= schedule_time.from && current_time < schedule_time.to
        ) &&
        ( /*enabled !== true || */ ((settings.websites || {})[location.hostname] || {}).enabled !== false)
    ) {
        injectStyle(getFilters(sett), 'night-mode-extension-filters', settings.schedule);

        injectStyle(settings.styles, 'night-mode-extension-global-styles', settings.schedule);

        if (settings.websites && current_website && current_website.styles) {
            injectStyle(current_website.styles, 'night-mode-extension-styles', settings.schedule);
        }

        if (settings.invert_colors !== false) {
            document.documentElement.classList.add('dark-mode');
        }

        injectStyle(`
            #night-mode-extension-brightness {
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,` + (100 - settings.brightness) / 100 + `);
                pointer-events: none;
                z-index: 9999999999
            }`,
            'night-mode-extension-brightness-styles');

        injectStyle(`
            #night-mode-extension-contrast {
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(125,125,125,` + (100 - settings.contrast) / 100 + `);
                pointer-events: none;
                z-index: 999999999
            }`,
            'night-mode-extension-contrast-styles');
    } else {
        removeAll();
    }
}





/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
# Global variables
# Create style
# Converters
    # Style to RGB
    # Hex to RGB
    # RGB to HSL
    # HSL to style
# Modifiers
    # 
# Handlers
    # Attribute <* style="..."></*>
    # Element <link rel=stylesheet href="...">
    # Element <style>...</style>
# Parsers
    # Mutations
    # Rules
    # Properties
    # Colors
        # Background color
# Selectors
# Initialization
    # Observer
--------------------------------------------------------------*/

var settings = {},
    current_website,
    regex_rgb = /(#[A-Za-z0-9]+)|(rgba?\([^)]+\))|(\b[a-z]+)/g,
    regex_numbers = /[0-9.]+/g,
    color_keywords = {
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
        honeydew: [null],
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
    };


/*--------------------------------------------------------------
# CREATE STYLE
--------------------------------------------------------------*/

function createStyle(content) {
    var element = document.createElement('style');

    element.className = 'dark-mode--stylesheet';
    element.textContent = content;

    document.head.appendChild(element);

    return element;
}


/*--------------------------------------------------------------
# CONVERTERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# STYLE TO RGB
--------------------------------------------------------------*/

function styleToRgb(string) {
    var match = string.match(regex_numbers);

    if (match) {
        for (var i = 0, l = match.length; i < l; i++) {
            match[i] = parseFloat(match[i]);
        }
    }

    return match;
}


/*--------------------------------------------------------------
# HEX TO RGB
--------------------------------------------------------------*/

function hexToRgb(string) {
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
}


/*--------------------------------------------------------------
# RGB TO HSL
--------------------------------------------------------------*/

function rgbToHsl(array) {
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
}


/*--------------------------------------------------------------
# HSL TO STYLE
--------------------------------------------------------------*/

function hslToStyle(array) {
    if (array.length === 3) {
        return 'hsl(' + array[0] * 360 + 'deg,' + array[1] * 100 + '%,' + array[2] * 100 + '%)';
    } else {
        return 'hsla(' + array[0] * 360 + 'deg,' + array[1] * 100 + '%,' + array[2] * 100 + '%,' + array[3] + ')';
    }
}


/*--------------------------------------------------------------
# MODIFIERS
--------------------------------------------------------------*/

function modifyColor(hsl) {
    hsl[2] = 1 - hsl[2];

    return hslToStyle(hsl);
}


/*--------------------------------------------------------------
# BACKGROUND COLOR
--------------------------------------------------------------*/

function modifyBackgroundColor(value) {
    var hue = value[0],
        saturation = value[1],
        lightness = value[2];

    if (lightness > .85) {
        value = [hue, saturation, .125 + 1 - lightness];
    } else if (saturation > .5 && lightness < .7 && lightness > .4) {
        value[2] = .4;
    }

    return hslToStyle(value);
}


/*--------------------------------------------------------------
# TEXT COLOR
--------------------------------------------------------------*/

function modifyTextColor(value) {
    var hue = value[0],
        saturation = value[1],
        lightness = value[2];

    // Black & White
    if (saturation < .2 && lightness < .5 || hue > 0.555555556 && hue < 0.722222222 && lightness < .2) {
        value = [0, 0, 1 - lightness];
    }

    // Colored
    else if (lightness < .5) {
        value[2] = .75;
    }

    return hslToStyle(value);
}


/*--------------------------------------------------------------
# BORDER COLOR
--------------------------------------------------------------*/

function modifyBorderColor(value) {
    var hue = value[0],
        saturation = value[1],
        lightness = value[2];

    if (saturation < .2 && lightness > .3) {
        value = [0, 0, 1 - lightness];
    }

    return hslToStyle(value);
}


/*--------------------------------------------------------------
# HANDLERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# ATTRIBUTE <* STYLE="..."></*>
--------------------------------------------------------------*/

function attributeStyle(node) {
    if (typeof node.className === 'string' && node.className.indexOf('dark-mode--attribute') === -1) {
        node.className += ' dark-mode--attribute';

        node.setAttribute('style', parseProperties(node.style, true));
    }
}


/*--------------------------------------------------------------
# ELEMENT <LINK REL=STYLESHEET HREF="...">
--------------------------------------------------------------*/

async function elementLink(node) {
    var response = await (await fetch(node.href, {
        cache: 'force-cache',
        credentials: 'omit'
    })).text();

    node.classList.add('dark-mode--stylesheet');

    var element = createStyle(response),
        rules = element.sheet.cssRules;

    createStyle(parseRules(rules));

    element.remove();
}


/*--------------------------------------------------------------
# ELEMENT <STYLE>...</STYLE>
--------------------------------------------------------------*/

function elementStyle(node) {
    if (node.className.indexOf('dark-mode--stylesheet') === -1) {
        if (node.sheet) {
            createStyle(parseRules(node.sheet.cssRules));
        }
    }
}


/*--------------------------------------------------------------
# PARSERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# MUTATIONS
--------------------------------------------------------------*/

function parseMutations(mutationList) {
    for (var i = 0, l = mutationList.length; i < l; i++) {
        var mutation = mutationList[i];

        if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'style') {
                attributeStyle(mutation.target);
            }
        } else if (mutation.type === 'childList') {
            for (var j = 0, k = mutation.addedNodes.length; j < k; j++) {
                var node = mutation.addedNodes[j];

                if (node.nodeName === 'LINK') {
                    if (node.rel === 'stylesheet') {
                        elementLink(node);
                    }
                } else if (node.nodeName === 'STYLE') {
                    elementStyle(node);
                }
            }
        }
    }
}


/*--------------------------------------------------------------
# RULES
--------------------------------------------------------------*/

function parseRules(rules) {
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
                var result = parseRules(rule.cssRules);

                if (result.length > 0) {
                    string += '@media ' + rule.media.mediaText + '{' + result + '}';
                }
            }
        } else if (rule instanceof CSSImportRule) {
            if (
                rule.styleSheet &&
                rule.styleSheet.cssRules
            ) {
                var result = parseRules(rule.styleSheet.cssRules);

                if (result.length > 0) {
                    string += result;
                }
            }
        } else if (rule instanceof CSSStyleRule) {
            var properties = parseProperties(rule.style);

            if (properties.length > 0) {
                string += 'html.dark-mode ' + rule.selectorText + '{' + properties + '}';
            }
        } else if (rule instanceof CSSSupportsRule) {
            if (CSS.supports(rule.conditionText)) {
                var result = parseRules(rule.cssRules);

                if (result.length > 0) {
                    string += result;
                }
            }
        }
    }

    return string;
}


/*--------------------------------------------------------------
# PROPERTIES
--------------------------------------------------------------*/

function parseProperties(properties, is_inline) {
    var string = '';

    for (var i = 0, l = properties.length; i < l; i++) {
        var property = properties[i];

        if (
            property === 'background-color' ||
            property === 'background-image'
        ) {
            var value = properties.getPropertyValue(property);

            if (
                value !== 'none' &&
                value !== 'initial' &&
                value !== 'currentcolor' &&
                value !== 'transparent'
            ) {
                var modified_value = parseBackgroundColor(value);

                if (modified_value) {
                    string += property + ':' + modified_value + ' !important;';
                }
            }
        } else if (property === 'color') {
            var value = properties.getPropertyValue(property);

            if (
                value !== 'none' &&
                value !== 'initial' &&
                value !== 'currentcolor' &&
                value !== 'transparent'
            ) {
                var modified_value = parseTextColor(value);

                if (modified_value) {
                    string += property + ':' + modified_value + ' !important;';
                }
            }
        } else if (
            property === 'border-top-color' ||
            property === 'border-right-color' ||
            property === 'border-bottom-color' ||
            property === 'border-left-color' ||
            property === 'box-shadow'
        ) {
            var value = properties.getPropertyValue(property);

            if (
                value !== 'none' &&
                value !== 'initial' &&
                value !== 'currentcolor' &&
                value !== 'transparent'
            ) {
                var modified_value = parseBorderColor(value);

                if (modified_value) {
                    string += property + ':' + modified_value + ' !important;';
                }
            }
        } else if (property.indexOf('--') === 0) {
            var value = properties.getPropertyValue(property);

            if (
                value !== 'none' &&
                value !== 'initial' &&
                value !== 'currentcolor' &&
                value !== 'transparent'
            ) {
                var match = value.match(regex_rgb);

                if (match) {
                    for (var j = 0, k = match.length; j < k; j++) {
                        var color = parseColor(match[j]);

                        if (color) {
                            value = value.replace(match[j], modifyColor(color));
                        }
                    }

                    string += property + ':' + value + ' !important;';
                }
            }
        } else if (is_inline) {
            string += property + ':' + properties.getPropertyValue(property) + ';';
        }
    }

    return string;
}


/*--------------------------------------------------------------
# COLORS
--------------------------------------------------------------*/

function parseColor(value) {
    if (value.indexOf('rgb') === 0) {
        var array = styleToRgb(value);

        if (array) {
            return rgbToHsl(array);
        }
    } else if (value.indexOf('#') === 0) {
        return rgbToHsl(hexToRgb(value));
    } else if (color_keywords[value]) {
        return color_keywords[value];
    }
}


/*--------------------------------------------------------------
# BACKGROUND COLOR
--------------------------------------------------------------*/

function parseBackgroundColor(value) {
    var parsed_value = parseColor(value);

    if (parsed_value) {
        return modifyBackgroundColor(parsed_value);
    } else {
        var match = value.match(regex_rgb);

        if (match) {
            for (var i = 0, l = match.length; i < l; i++) {
                var color = parseColor(match[i]);

                if (color) {
                    value = value.replace(match[i], modifyBackgroundColor(color));
                }
            }

            return value;
        }
    }
}


/*--------------------------------------------------------------
# TEXT COLOR
--------------------------------------------------------------*/

function parseTextColor(value) {
    var parsed_value = parseColor(value);

    if (parsed_value) {
        return modifyTextColor(parsed_value);
    } else {
        var match = value.match(regex_rgb);

        if (match) {
            for (var i = 0, l = match.length; i < l; i++) {
                var color = parseColor(match[i]);

                if (color) {
                    value = value.replace(match[i], modifyTextColor(color));
                }
            }

            return value;
        }
    }
}


/*--------------------------------------------------------------
# BORDER COLOR
--------------------------------------------------------------*/

function parseBorderColor(value) {
    var parsed_value = parseColor(value);

    if (parsed_value) {
        return modifyBorderColor(parsed_value);
    } else {
        var match = value.match(regex_rgb);

        if (match) {
            for (var i = 0, l = match.length; i < l; i++) {
                var color = parseColor(match[i]);

                if (color) {
                    value = value.replace(match[i], modifyBorderColor(color));
                }
            }

            return value;
        }
    }
}


/*--------------------------------------------------------------
# SELECTORS
--------------------------------------------------------------*/

function queryLinks() {
    var links = document.querySelectorAll('link[rel=stylesheet]:not(.dark-mode--stylesheet)');

    for (var i = 0, l = links.length; i < l; i++) {
        elementLink(links[i]);
    }
}

function queryStyles() {
    var styles = document.querySelectorAll('style:not(.dark-mode--stylesheet)');

    for (var i = 0, l = styles.length; i < l; i++) {
        var style = styles[i];

        if (style.sheet) {
            createStyle(parseRules(style.sheet.cssRules));
        }
    }
}

function queryInlines() {
    var elements = document.querySelectorAll('*[style]:not(.dark-mode--attribute)');

    for (var i = 0, l = elements.length; i < l; i++) {
        attributeStyle(elements[i]);
    }
}


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# OBSERVER
--------------------------------------------------------------*/

var observer = new MutationObserver(parseMutations);

observer.observe(document, {
    attributes: true,
    attributeFilter: [
        'style'
    ],
    childList: true,
    subtree: true
});


/*--------------------------------------------------------------
# OBSERVER
--------------------------------------------------------------*/

chrome.storage.local.get(function(items) {
    settings = items;

    update();
});

chrome.storage.onChanged.addListener(function(changes) {
    removeAll();

    for (var key in changes) {
        settings[key] = changes[key].newValue;
    }

    update();
});

document.addEventListener('DOMContentLoaded', function() {
    queryLinks();
    queryStyles();
    queryInlines();

    var brightness = document.createElement('div'),
        contrast = document.createElement('div');

    brightness.id = 'night-mode-extension-brightness';
    contrast.id = 'night-mode-extension-contrast';

    document.body.appendChild(brightness);
    document.body.appendChild(contrast);
});

window.addEventListener('load', function() {
    observer.disconnect();

    queryLinks();
    queryStyles();
    queryInlines();
});

var page_url = location.href;

document.addEventListener('visibilitychange', function() {
    if (page_url !== location.href) {
        queryLinks();
        queryStyles();
        queryInlines();
    }
});

chrome.runtime.sendMessage('dark-mode');