import { colors, colorSettings, darkColors } from './colors.defaults'
import breaks from './breakpoints.defaults'
import media from './mediaQueries.defaults'
import fonts from './fonts.defaults'
import times from './times.defaults'
import sizes from './sizes.defaults'

export default {
	fonts,
	colorSettings,
	colors,
	darkMode: {
		colors: darkColors,
	},
	breaks,
	media,
	times,
	css: {}, // custom css can be injected here for various elements (mostly used in swf-ui)
	zMax: 50, // maximum z-index used
	sizes
}
