import { colors, colorSettings, darkColors } from './colors.defaults'
import breaks from './breakpoints.defaults'
import media from './mediaQueries.defaults'
import fonts from './fonts.defaults'
import times from './times.defaults'

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
	zMax: 50, // maximum z-index used
}
