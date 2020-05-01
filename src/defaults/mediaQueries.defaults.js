// for comprehensive list of breakpoints: https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
import breaks from './breakpoints.defaults'
import { createMediaQuery } from '../lib/media.helpers'

export default {
	// NOTE: we don't use mobile breakpoints in mobile first dev
	mobile: createMediaQuery({ min: '300px', max: `${breaks.tablet.num - 1}px` }),

	tablet: createMediaQuery({ min: breaks.tablet.px }),
	sdesk: createMediaQuery({ min: breaks.sdesk.px }),
	ldesk: createMediaQuery({ min: breaks.ldesk.px }), // large desktop

	iphoneX: {
		port: createMediaQuery({ min: '375px', max: '812px', r: 3, o: 'portrait' }),
		land: createMediaQuery({ min: '375px', max: '812px', r: 3, o: 'landscape' }),
		portland: createMediaQuery({ min: '375px', max: '812px', r: 3 }),
	},
	iphone678: {
		port: createMediaQuery({ min: '375px', max: '667px', r: 2, o: 'portrait' }),
		land: createMediaQuery({ min: '375px', max: '667px', r: 2, o: 'landscape' }),
		portland: createMediaQuery({ min: '375px', max: '667px', r: 2 }),
	},
	iphone5: {
		port: createMediaQuery({ min: '320px', max: '568px', r: 2, o: 'portrait' }),
		land: createMediaQuery({ min: '320px', max: '568px', r: 2, o: 'landscape' }),
		portland: createMediaQuery({ min: '320px', max: '568px', r: 2 }),
	},

	galaxyS45: {
		port: createMediaQuery({ min: '320px', max: '640px', r: 3, o: 'portrait' }),
		land: createMediaQuery({ min: '320px', max: '640px', r: 3, o: 'landscape' }),
		portland: createMediaQuery({ min: '320px', max: '640px', r: 3 }),
	},
	galaxyS6: {
		port: createMediaQuery({ min: '360px', max: '640px', r: 4, o: 'portrait' }),
		land: createMediaQuery({ min: '360px', max: '640px', r: 4, o: 'landscape' }),
		portland: createMediaQuery({ min: '360px', max: '640px', r: 4 }),
	},

	pixel: {
		port: createMediaQuery({ min: '360px', max: '640px', r: 3, o: 'portrait' }),
		land: createMediaQuery({ min: '360px', max: '640px', r: 3, o: 'landscape' }),
		portland: createMediaQuery({ min: '360px', max: '640px', r: 3 }),
	},
	pixelXL: {
		port: createMediaQuery({ min: '360px', max: '640px', r: 4, o: 'portrait' }),
		land: createMediaQuery({ min: '360px', max: '640px', r: 4, o: 'landscape' }),
		portland: createMediaQuery({ min: '360px', max: '640px', r: 4 }),
	},
}
