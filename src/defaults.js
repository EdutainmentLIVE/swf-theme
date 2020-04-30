export default {
	// color defaults
	colors: {
		// Main color used other than monochromatics
		primary: '#0569b1',
		// CTA, Focal points, etc.
		secondary: '#f7a707',
		aux1: '#7990ad',
		aux2: '#79a6ad',

		black: '#000',
		white: '#FFF',

		err: '#df1500',
		warn: '#ff9900',
		ok: '#5bbb12',

		grey: '#868b8d',
	},

	colorSettings: {
		tintOpacity: 0.25,
		lightenAmount: 25,
		darkenAmount: 20,
	},

	// Breakpoint defaults
	// for comprehensive list of breakpoints: https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
	breaks: {
		// NOTE: we don't use mobile breakpoints in mobile first dev
		tablet: '767px',
		sdesk: '1112px', // small desktop
		ldesk: '1500px', // large desktop
	},
}
