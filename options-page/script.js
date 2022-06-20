/*--------------------------------------------------------------
>>> OPTIONS PAGE
----------------------------------------------------------------
# Global variable
# Functions
	# Export settings
	# Import settings
# Skeleton
# Initialization
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

var extension = {};


/*--------------------------------------------------------------
# FUNCTIONS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# EXPORT SETTINGS
--------------------------------------------------------------*/

extension.exportSettings = function () {
	if (location.href.indexOf('action=export-settings') !== -1) {
		satus.render({
			component: 'modal',
			variant: 'confirm',
			content: 'areYouSureYouWantToExportTheData',
			buttons: {
				cancel: {
					component: 'button',
					text: 'cancel',
					on: {
						click: function () {
							this.modalProvider.close();
						}
					}
				},
				ok: {
					component: 'button',
					text: 'ok',
					on: {
						click: function () {
							try {
								var blob = new Blob([JSON.stringify(satus.storage.data)], {
									type: 'application/json;charset=utf-8'
								});

								chrome.permissions.request({
									permissions: ['downloads']
								}, function (granted) {
									if (granted) {
										chrome.downloads.download({
											url: URL.createObjectURL(blob),
											filename: 'dark-mode.json',
											saveAs: true
										}, function () {
											setTimeout(function () {
												close();
											}, 1000);
										});
									}
								});
							} catch (error) {
								console.error(error);
							}
						}
					}
				}
			}
		}, skeleton.rendered);
	}
};


/*--------------------------------------------------------------
# IMPORT SETTINGS
--------------------------------------------------------------*/

extension.importSettings = function () {
	if (location.href.indexOf('action=import-settings') !== -1) {
		satus.render({
			component: 'modal',
			variant: 'confirm',
			content: 'areYouSureYouWantToImportTheData',
			buttons: {
				cancel: {
					component: 'button',
					text: 'cancel',
					on: {
						click: function () {
							this.modalProvider.close();
						}
					}
				},
				ok: {
					component: 'button',
					text: 'ok',
					on: {
						click: function () {
							var input = document.createElement('input');

							input.type = 'file';

							input.addEventListener('change', function () {
								var file_reader = new FileReader();

								file_reader.onload = function () {
									var data = JSON.parse(this.result);

									for (var key in data) {
										satus.storage.set(key, data[key]);
									}

									setTimeout(function () {
										chrome.runtime.sendMessage({
											action: 'import-settings'
										});

										setTimeout(function () {
											close();
										}, 128);
									}, 256);
								};

								file_reader.readAsText(this.files[0]);
							});

							input.click();
						}
					}
				}
			}
		}, skeleton.rendered);
	}
};


/*--------------------------------------------------------------
# SKELETON
--------------------------------------------------------------*/

var skeleton = {
	component: 'base',

	header: {
		component: 'header',

		sectionStart: {
			component: 'section',
			variant: 'align-start',

			back: {
				component: 'button',
				variant: 'icon',
				attr: {
					'hidden': 'true'
				},
				on: {
					click: 'main.layers.back'
				},

				svg: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 24 24',
						'stroke-width': '1.5',
						'stroke': 'currentColor',
						'fill': 'none'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M14 18l-6-6 6-6'
						}
					}
				}
			},
			title: {
				component: 'span',
				variant: 'title',
				data: {
					version: chrome.runtime.getManifest().version
				}
			}
		},
		sectionEnd: {
			component: 'section',
			variant: 'align-end',

			power: {
				component: 'button',
				variant: ['icon', 'power'],
				data: {
					value: function () {
						return satus.storage.get('power') !== false;
					}
				},
				on: {
					click: function () {
						if (satus.storage.get('power') === false) {
							this.dataset.value = true;
	
							satus.storage.set('power', true);
						} else {
							this.dataset.value = false;
	
							satus.storage.set('power', false);
						}
					}
				},

				svg: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 24 24',
						'stroke': 'currentColor',
						'stroke-linecap': 'round',
						'stroke-linejoin': 'round',
						'stroke-width': '2',
						'fill': 'none'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10'
						}
					}
				}
			},
			menu: {
				component: 'button',
				variant: 'icon',
				on: {
					click: {
						component: 'modal',
						variant: 'vertical-menu',

						label: {
							component: 'span',
							text: 'Settings for',
							style: {
								height: 'auto',
    							margin: '0 0 12px'
							}
						},
						separate: {
							component: 'tabs',
							items: function () {
								return [
									'global',
									extension.hostname.replace('www.', '')
								];
							},
							value: function () {
								return satus.storage.get('websites/' + extension.hostname + '/separated') === true ? 1 : 0;
							},
							on: {
								click: function () {
									if (this.value === 1) {
										satus.storage.set('websites/' + extension.hostname + '/separated', true);
									} else {
										satus.storage.set('websites/' + extension.hostname + '/separated', false);
									}

									satus.empty(skeleton.main.layers.section.rendered);

									satus.render(skeleton.main.layers.rendered.path[0].section, skeleton.main.layers.section.rendered, undefined, true);
								}
							}
						},
						divider: {
							component: 'divider'
						},
					}
				},

				svg: {
					component: 'svg',
					attr: {
						'viewBox': '0 0 24 24',
						'stroke-width': '2',
						'stroke': 'currentColor',
						'fill': 'none'
					},

					circle1: {
						component: 'circle',
						attr: {
							'cx': '12',
							'cy': '5.25',
							'r': '0.45'
						}
					},
					circle2: {
						component: 'circle',
						attr: {
							'cx': '12',
							'cy': '12',
							'r': '0.45'
						}
					},
					circle3: {
						component: 'circle',
						attr: {
							'cx': '12',
							'cy': '18.75',
							'r': '0.45'
						}
					}
				}
			}
		}
	},
	main: {
		component: 'main',

		layers: {
			component: 'layers',
			on: {
				open: function () {
					var skeleton = satus.last(this.path),
						section = this.baseProvider.skeleton.header.sectionStart,
						title = 'Dark Mode';

					if (skeleton.parentSkeleton) {
						if (skeleton.parentSkeleton.label) {
							title = skeleton.parentSkeleton.label.text;
						} else if (skeleton.parentSkeleton.text) {
							title = skeleton.parentSkeleton.text;
						}
					}

					section.back.rendered.hidden = this.path.length <= 1;
					section.title.rendered.innerText = satus.locale.get(title);

					var vertical_menu = document.querySelector('.satus-modal--vertical-menu');

					if (vertical_menu) {
						vertical_menu.close();
					}
				}
			},

			toolbar: {}
		}
	}
};


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

chrome.runtime.sendMessage({
	action: 'options-page-connected'
}, function (response) {
	if (response.isPopup === false) {
		document.body.setAttribute('tab', '');
	}
});

satus.storage.import(function (items) {
	var language = items.language;

	if (!language || language === 'default') {
		language = window.navigator.language;
	}

	satus.locale.import(language, function () {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			var tab = tabs[0],
				url = new URL(tab.url);

			extension.hostname = url.hostname;

			if (
				tab.url.startsWith('about:') ||
				tab.url.startsWith('chrome') ||
				tab.url.startsWith('edge') ||
				tab.url.startsWith('https://addons.mozilla.org') ||
				tab.url.startsWith('https://chrome.google.com/webstore') ||
				tab.url.startsWith('https://microsoftedge.microsoft.com/addons') ||
				tab.url.startsWith('moz') ||
				tab.url.startsWith('view-source:') ||
				tab.url.endsWith('.pdf')
			) {
				skeleton.main.layers.toolbar = {
					component: 'alert',
					variant: 'error',
					text: function () {
						return satus.locale.get('thePageHOSTNAMEisProtectedByBrowser').replace('HOSTNAME', url.protocol + '//' + url.hostname);
					}
				};
			} else {
				skeleton.main.layers.toolbar = {
					component: 'alert',
					variant: 'success',

					switch: {
						component: 'switch',
						text: url.hostname,
						storage: 'websites/' + url.hostname + '/active',
						value: true
					}
				};
			}

			satus.render(skeleton);

			extension.exportSettings();
			extension.importSettings();
		});
	}, '_locales/');
});