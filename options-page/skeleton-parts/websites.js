/*--------------------------------------------------------------
>>> WEBSITES
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.websites = {
	component: 'button',
	on: {
		click: {
			component: 'section',
			variant: 'card',
			on: {
				render: function () {
					var websites = satus.storage.get('websites');

					if (satus.isObject(websites)) {
						for (var hostname in websites) {
							satus.render({
								component: 'button',
								text: hostname.replace('www.', ''),
								on: {
									click: {
										toolbar: {
											component: 'alert',
											variant: 'success',

											switch: {
												component: 'switch',
												text: hostname,
												storage: 'websites/' + hostname + '/active',
												value: true
											}
										},
										section: {
											component: 'section',
											variant: 'card',

											theme: {
												component: 'select',
												text: 'theme',
												options: [{
													text: 'invertColors',
													value: 'invert'
												}, {
													text: 'dynamicFilter',
													value: 'dynamic'
												}, {
													text: 'disabled',
													value: 'disabled'
												}],
												storage: 'websites/' + hostname + '/theme'
											},
											brightness: {
												component: 'slider',
												variant: 'row',
												text: 'brightness',
												max: 100,
												value: 100,
												storage: 'websites/' + hostname + '/filters/brightness'
											},
											contrast: {
												component: 'slider',
												variant: 'row',
												text: 'contrast',
												max: 100,
												value: 100,
												storage: 'websites/' + hostname + '/filters/contrast'
											},
											grayscale: {
												component: 'slider',
												variant: 'row',
												text: 'grayscale',
												max: 100,
												storage: 'websites/' + hostname + '/filters/grayscale'
											},
											bluelight: {
												component: 'slider',
												variant: 'row',
												text: 'bluelight',
												max: 100,
												storage: 'websites/' + hostname + '/filters/bluelight'
											}
										}
									}
								}
							}, this);
						}
					}
				}
			}
		}
	},

	svg: {
		component: 'svg',
		attr: {
			'viewBox': '0 0 24 24',
			'fill': 'none',
			'stroke': '#ffbf00',
			'troke-linecap': 'round',
			'stroke-linejoin': 'round',
			'stroke-width': '1.75'
		},

		circle: {
			component: 'circle',
			attr: {
				'cx': '12',
				'cy': '12',
				'r': '10'
			}
		},
		path: {
			component: 'path',
			attr: {
				'd': 'M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'
			}
		}
	},
	label: {
		component: 'span',
		text: 'websites'
	}
};