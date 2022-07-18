/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# Migration
# On installed
# Messages
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# MIGRATION
--------------------------------------------------------------*/

function migration() {
	chrome.storage.local.get(function (items) {
		if (items['storage-v3.1'] === true) {
			return false;
		}

		var storage = {
			filters: {},
			websites: {}
		};

		try {
			if (items.power === false || items.power === true) {
				storage.power = items.power;
			}

			if (items.domains) {
				for (var hostname in items.domains) {
					storage.websites[hostname] = {
						filters: {}
					};

					storage.websites[hostname].active = items.domains[hostname];
				}
			}

			if (typeof items.styles === 'string') {
				storage.styles = items.styles;
			}

			if (['disabled', 'sunset_to_sunrise', 'system_peference'].indexOf(items.schedule) !== -1) {
				storage.schedule = items.schedule;
			}

			if (typeof items.time_from === 'string') {
				storage.time_from = items.time_from;
			}

			if (typeof items.time_to === 'string') {
				storage.time_to = items.time_to;
			}

			if (typeof items.language === 'string') {
				storage.language = items.language;
			}

			if (items.use_24_hour_format === false) {
				storage.use_24_hour_format = false;
			}

			if (items.filters) {
				if (items.filters['dynamic-theme'] === true) {
					storage.theme = 'dynamic';
				}

				if (items.filters['invert-colors'] === true) {
					storage.theme = 'invert';
				}

				if (items.filters.brightness > 0 && items.filters.brightness < 100) {
					storage.filters.brightness = items.filters.brightness;
				}

				if (items.filters.contrast > 0 && items.filters.contrast < 100) {
					storage.filters.contrast = items.filters.contrast;
				}

				if (items.filters.grayscale > 0 && items.filters.grayscale < 100) {
					storage.filters.grayscale = items.filters.grayscale;
				}

				if (items.filters.bluelight > 0 && items.filters.bluelight < 100) {
					storage.filters.bluelight = items.filters.bluelight;
				}
			}

			if (items.websites) {
				for (var hostname in items.websites) {
					var website = items.websites[hostname];

					if (!storage.websites[hostname]) {
						storage.websites[hostname] = {
							filters: {}
						};
					} else if (!storage.websites[hostname].filters) {
						storage.websites[hostname].filters = {};
					}

					if (website.global === false) {
						storage.websites[hostname].separeted = true;
					}

					if (typeof website.styles === 'string') {
						storage.websites[hostname].styles = website.styles;
					}

					if (website.filters) {
						if (website.filters['dynamic-theme'] === true) {
							storage.websites[hostname].theme = 'dynamic';
						}

						if (website.filters['invert-colors'] === true) {
							storage.websites[hostname].theme = 'invert';
						}

						if (website.filters.brightness > 0 && website.filters.brightness < 100) {
							storage.websites[hostname].filters.brightness = website.filters.brightness;
						}

						if (website.filters.contrast > 0 && website.filters.contrast < 100) {
							storage.websites[hostname].filters.contrast = website.filters.contrast;
						}

						if (website.filters.grayscale > 0 && website.filters.grayscale < 100) {
							storage.websites[hostname].filters.grayscale = website.filters.grayscale;
						}

						if (website.filters.bluelight > 0 && website.filters.bluelight < 100) {
							storage.websites[hostname].filters.bluelight = website.filters.bluelight;
						}
					}
				}
			}
		} catch (error) {
			console.error(error);

			storage.old = items;
		}

		storage['storage-v3.1'] = true;

		chrome.storage.local.clear(function () {
			chrome.storage.local.set(storage);
		});
	});
}


/*--------------------------------------------------------------
# ON INSTALLED
--------------------------------------------------------------*/

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
		/*chrome.tabs.query({}, function (tabs) {
			for (var i = 0, l = tabs.length; i < l; i++) {
				var tab = tabs[i],
					url = tab.url;

				if (!url.startsWith('about:') &&
					!url.startsWith('chrome') &&
					!url.startsWith('edge') &&
					!url.startsWith('https://addons.mozilla.org') &&
					!url.startsWith('https://chrome.google.com/webstore') &&
					!url.startsWith('https://microsoftedge.microsoft.com/addons') &&
					!url.startsWith('moz') &&
					!url.startsWith('view-source:') &&
					!url.endsWith('.pdf')
				) {
					chrome.scripting.insertCSS({
						target: {
							tabId: tab.id,
							allFrames: true
						},
						files: [
							'/content-scripts/styles.css'
						]
					});

					chrome.scripting.executeScript({
						target: {
							tabId: tab.id,
							allFrames: true
						},
						files: [
							'/assets/satus/satus.js',
							'/content-scripts/core.js',
							'/content-scripts/dynamic-theme.js',
							'/content-scripts/custom-css.js',
							'/content-scripts/filters.js'
						]
					});
				}
			}
		});*/
	} else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
		migration();
	}
});


/*--------------------------------------------------------------
# MESSAGES
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	var action = message.action;

	if (action === 'fetch') {
		var response = await (await fetch(message.url, {
			cache: 'force-cache',
			credentials: 'omit'
		})).text();

		chrome.tabs.sendMessage(sender.tab.id, {
			action: 'fetch-response',
			response: response,
			index: message.index,
			url: message.url
		});
	}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	var action = message.action;

	if (action === 'insert-user-agent-stylesheet') {
		if (!sender.frameId) {
			chrome.scripting.insertCSS({
				target: {
					tabId: sender.tab.id,
					allFrames: true
				},
				files: [
					'/content-scripts/user-agent-stylesheet.css'
				]
			});
		}
	} else if (action === 'remove-user-agent-stylesheet') {
		if (!sender.frameId) {
			chrome.scripting.removeCSS({
				target: {
					tabId: sender.tab.id,
					allFrames: true
				},
				files: [
					'/content-scripts/user-agent-stylesheet.css'
				]
			});
		}
	} else if (action === 'tab-connected') {
		sendResponse(new URL(sender.url).hostname);
	} else if (action === 'options-page-connected') {
		sendResponse({
			isPopup: sender.hasOwnProperty('tab') === false
		});
	} else if (action === 'import-settings') {
		migration();
	}
});