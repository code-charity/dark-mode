/*--------------------------------------------------------------
>>> SCHEDULE
----------------------------------------------------------------
# ???
# Turn on
# Time from
# Time to
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# 
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.schedule = {
	component: 'button',
	on: {
		click: {
			component: 'section',
			variant: 'card'
		}
	},

	svg: {
		component: 'svg',
		attr: {
			'viewBox': '0 0 24 24',
			'fill': '#ffbf00'
		},

		path_1: {
			component: 'path',
			attr: {
				'd': 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
			}
		},
		path_2: {
			component: 'path',
			attr: {
				'd': 'M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'
			}
		}
	},
	label: {
		component: 'span',
		text: 'schedule'
	}
};


/*--------------------------------------------------------------
# TURN ON
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.schedule.on.click.turnOn = {
	component: 'select',
	text: 'turnOn',
	storage: 'schedule',
	options: [{
		text: 'disabled',
		value: 'disabled'
	}, {
		text: 'sunsetToSunrise',
		value: 'sunset_to_sunrise'
	}, {
		text: 'systemPeference',
		value: 'system_peference'
	}]
};


/*--------------------------------------------------------------
# TIME FROM
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.schedule.on.click.timeFrom = {
	component: 'time',
	text: 'timeFrom',
	hour12: function () {
		return satus.storage.get('use_24_hour_format') === false;
	},
	storage: 'time_from'
};


/*--------------------------------------------------------------
# TIME TO
--------------------------------------------------------------*/

skeleton.header.sectionEnd.menu.on.click.schedule.on.click.timeTo = {
	component: 'time',
	text: 'timeTo',
	hour12: function () {
		return satus.storage.get('use_24_hour_format') === false;
	},
	storage: 'time_to'
};