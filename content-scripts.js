var settings = {};

function getFilters(settings) {
    var string = '',
        body_filter = '';

    if (settings.bluelight > 0) {
        var bluelight = document.getElementById('night-mode-bluelight') || document.createElement('div');

        bluelight.id = 'night-mode-bluelight';
        bluelight.style.position = 'absolute';
        bluelight.style.visibility = 'hidden';
        bluelight.style.pointerEvents = 'none';
        bluelight.innerHTML = '<svg version=1.1 xmlns=//www.w3.org/2000/svg viewBox="0 0 1 1"><filter id=bluelight-filter><feColorMatrix type=matrix values="1 0 0 0 0 0 1 0 0 0 0 0 ' + (1 - parseFloat(settings.bluelight) / 100) + ' 0 0 0 0 0 1 0"></feColorMatrix></filter></svg>';

        document.documentElement.appendChild(bluelight);

        document.documentElement.style.webkitFilter = 'url(#bluelight-filter)';
        document.documentElement.style.filter = 'url(#bluelight-filter)';
    } else if (document.getElementById('night-mode-bluelight')) {
        document.getElementById('night-mode-bluelight').remove();
    }

    if (settings.invert_colors === true || settings.invert_colors === undefined) {
        string += 'html{background:0 0!important}body{background:#000!important}body [style*="url("],body [style*=background-position],body canvas,body iframe,body img:not([src*="/ic_"]):not([src*=_ic_]):not([class*=icon]),body pre,body video{-webkit-filter:invert(1)!important;filter:invert(1)!important}';
        body_filter += ' invert(1)';
    }

    if (typeof settings.brightness === 'number') {
        body_filter += ' brightness(' + settings.brightness + '%)';
    }

    if (typeof settings.contrast === 'number') {
        body_filter += ' contrast(' + settings.contrast + '%)';
    }

    if (typeof settings.grayscale === 'number') {
        body_filter += ' grayscale(' + settings.grayscale + '%)';
    }

    if (typeof settings.sepia === 'number') {
        body_filter += ' sepia(' + settings.sepia + '%)';
    }

    if (typeof settings.saturate === 'number') {
        body_filter += ' saturate(' + settings.saturate + '%)';
    }

    string += 'body{-webkit-filter:' + body_filter + ';filter:' + body_filter + '}';

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

    for (var key in settings.websites) {
        if (settings.websites[key].enabled === true) {
            enabled = true;
        }
    }

    if (
        settings.mode !== false &&
        (
            settings.schedule !== 'sunset_to_sunrise' ||
            current_time >= schedule_time.from && current_time < schedule_time.to
        ) &&
        (/*enabled !== true || */((settings.websites || {})[location.hostname] || {}).enabled !== false)
    ) {
        if (settings.websites && settings.websites[location.hostname] && settings.websites[location.hostname].filters) {
            injectStyle(getFilters(settings.websites[location.hostname].filters), 'night-mode-extension-filters', settings.schedule);
        } else {
            injectStyle(getFilters({}), 'night-mode-extension-filters', settings.schedule);
        }

        if (settings.websites && settings.websites[location.hostname] && settings.websites[location.hostname].styles) {
            injectStyle(settings.websites[location.hostname].styles, 'night-mode-extension-styles', settings.schedule);
        }
    } else {
        if (document.querySelector('#night-mode-extension-filters')) {
            document.querySelector('#night-mode-extension-filters').remove();
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

    if (document.querySelector('#night-mode-extension-styles')) {
        document.querySelector('#night-mode-extension-styles').remove();
    }

    for (var key in changes) {
        settings[key] = changes[key].newValue;
    }

    update();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (window.self === window.top && request === 'requestTabUrl') {
        sendResponse(location.href);
    }
});