/*--------------------------------------------------------------
>>> CSS
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.css = {
	component: 'button',
	on: {
		click: {
			textField: {
				component: 'text-field',
				variant: 'css-editor',
				storage: function () {
					var prefix = 'websites/' + extension.hostname;

					if (satus.storage.get(prefix + '/separated') === true) {
						return prefix + '/styles';
					} else {
						return 'styles';
					}
				}
			}
		}
	},

	svg: {
		component: 'svg',
		attr: {
			'viewBox': '0 0 24 24',
			'fill': '#ffbf00'
		},

		path: {
			component: 'path',
			attr: {
				'd': 'M14 20v-2h3q.425 0 .712-.288Q18 17.425 18 17v-2q0-.95.55-1.725.55-.775 1.45-1.1v-.35q-.9-.325-1.45-1.1Q18 9.95 18 9V7q0-.425-.288-.713Q17.425 6 17 6h-3V4h3q1.25 0 2.125.875T20 7v2q0 .425.288.712.287.288.712.288h1v4h-1q-.425 0-.712.287Q20 14.575 20 15v2q0 1.25-.875 2.125T17 20Zm-7 0q-1.25 0-2.125-.875T4 17v-2q0-.425-.287-.713Q3.425 14 3 14H2v-4h1q.425 0 .713-.288Q4 9.425 4 9V7q0-1.25.875-2.125T7 4h3v2H7q-.425 0-.713.287Q6 6.575 6 7v2q0 .95-.55 1.725-.55.775-1.45 1.1v.35q.9.325 1.45 1.1Q6 14.05 6 15v2q0 .425.287.712Q6.575 18 7 18h3v2Z'
			}
		}
	},
	label: {
		component: 'span',
		text: 'styles'
	}
};