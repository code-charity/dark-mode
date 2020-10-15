var settings = {},
    current_website;

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
        
        if (settings.invert_colors === true || settings.invert_colors === undefined) {
            string += 'html,body{background:#000 0 0 !important}';
            
            body_child_filter += 'invert(1)';
        }
        
        if (typeof settings.brightness === 'number' && settings.brightness < 100) {
            body_child_filter += ' brightness(' + settings.brightness + '%)';
        }

        if (typeof settings.contrast === 'number' && settings.contrast < 100) {
            body_child_filter += ' contrast(' + settings.contrast + '%)';
        }

        if (typeof settings.grayscale === 'number' && settings.grayscale > 0) {
            body_child_filter += ' grayscale(' + settings.grayscale + '%)';
        }

        if (typeof settings.sepia === 'number' && settings.sepia > 0) {
            body_child_filter += ' sepia(' + settings.sepia + '%)';
        }
    } else if (document.getElementById('night-mode-bluelight')) {
        document.getElementById('night-mode-bluelight').remove();
    }

    if (settings.invert_colors === true || settings.invert_colors === undefined) {
        string += 'body [style*="url("],body [style*=background-position],body canvas,body iframe,body img:not([src*="/ic_"]):not([src*=_ic_]):not([class*=icon]),body pre,body video{-webkit-filter:invert(1)!important;filter:invert(1)!important}';
        
        if (!(settings.bluelight > 0) && (settings.invert_colors === true || settings.invert_colors === undefined)) {
            string += 'html,body{background:#fff 0 0 !important}';
            html_filter += ' invert(1)';
        }
    }
    
    if (!(settings.bluelight > 0)) {
        if (typeof settings.brightness === 'number' && settings.brightness < 100) {
            html_filter += ' brightness(' + settings.brightness + '%)';
        }

        if (typeof settings.contrast === 'number' && settings.contrast < 100) {
            html_filter += ' contrast(' + settings.contrast + '%)';
        }

        if (typeof settings.grayscale === 'number' && settings.grayscale > 0) {
            html_filter += ' grayscale(' + settings.grayscale + '%)';
        }

        if (typeof settings.sepia === 'number' && settings.sepia > 0) {
            html_filter += ' sepia(' + settings.sepia + '%)';
        }
    }
    
    if (html_filter.length > 0) {
        string += 'html{-webkit-filter:' + html_filter + ';filter:' + html_filter + '}';
    }
    
    if (body_filter.length > 0) {
        string += 'body{-webkit-filter:' + body_filter + ';filter:' + body_filter + '}';
    }
    
    if (body_child_filter.length > 0) {
        string += 'body > *{-webkit-filter:' + body_child_filter + ';filter:' + body_child_filter + '}';
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
    
    if (settings.websites && current_website && current_website.filters) {
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
    
    if (sett.sepia === undefined) {
        sett.sepia = settings.sepia;
    }
    

    if (
        settings.mode !== false &&
        (
            settings.schedule !== 'sunset_to_sunrise' ||
            current_time >= schedule_time.from && current_time < schedule_time.to
        ) &&
        (/*enabled !== true || */((settings.websites || {})[location.hostname] || {}).enabled !== false)
    ) {
        injectStyle(getFilters(sett), 'night-mode-extension-filters', settings.schedule);

        injectStyle(settings.styles, 'night-mode-extension-global-styles', settings.schedule);
        
        if (settings.websites && current_website && current_website.styles) {
            injectStyle(current_website.styles, 'night-mode-extension-styles', settings.schedule);
        }
    } else {
        if (document.querySelector('#night-mode-extension-filters')) {
            document.querySelector('#night-mode-extension-filters').remove();
        }

        if (document.querySelector('#night-mode-extension-global-styles')) {
            document.querySelector('#night-mode-extension-global-styles').remove();
        }

        if (document.querySelector('#night-mode-extension-styles')) {
            document.querySelector('#night-mode-extension-styles').remove();
        }
    }
}

chrome.storage.local.get(function(items) {
    settings = items;

    update();
});

chrome.storage.onChanged.addListener(function(changes) {
    if (document.querySelector('#night-mode-extension-filters')) {
        document.querySelector('#night-mode-extension-filters').remove();
    }

    if (document.querySelector('#night-mode-extension-global-styles')) {
        document.querySelector('#night-mode-extension-global-styles').remove();
    }

    if (document.querySelector('#night-mode-extension-styles')) {
        document.querySelector('#night-mode-extension-styles').remove();
    }

    for (var key in changes) {
        settings[key] = changes[key].newValue;
    }

    update();
});
