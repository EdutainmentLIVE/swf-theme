/*
 =================================================
  SwF THEME
 =================================================
* */
import defaultsDeep from 'lodash/defaultsDeep'

import defaultConfig from '../defaults'
import { generateMediaQueries } from '../lib/media.helpers'
import { generateGlobalStyles } from '../lib/globalStyles.helpers'
import { generateColors } from '../lib/color.helpers'
import { generateFonts, fluidFontSize as calcFluidFont } from '../lib/font.helpers'
import { generateBreaks } from '../lib/breakpoint.helpers'

const buildConfig = configuration => {
	console.log(
		'about to merge default config: ',
		defaultConfig,
		' with incoming config: ',
		configuration
	)
	const newConfig = defaultsDeep(configuration, defaultConfig)

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// Browser has dark mode enabled
		newConfig.colors = defaultsDeep(newConfig.darkMode.colors, newConfig.colors)
		newConfig.isDarkMode = true
	}

	return newConfig
}

/*
 =================================================
  EXPORTS
 =================================================
* */

export let config
export let breaks
export let media
export let colors
export let fonts
export let Globalstyles
export const fluidFontSize = calcFluidFont

export const createTheme = (configuration = {}, styleComponentsGlobalStylesFunc) => {
	// Build exports using provided configuration
	// NOTE: order here is important!

	config = buildConfig(configuration)

	breaks = generateBreaks(config)

	colors = generateColors(config)

	media = generateMediaQueries(config)

	fonts = generateFonts(config)

	Globalstyles = generateGlobalStyles(
		{ ...config, colors, fonts, media, breaks },
		styleComponentsGlobalStylesFunc
	)

	if (styleComponentsGlobalStylesFunc !== false)
		console.info('SwF Theme initialized with config: ', config)
}

createTheme(defaultConfig, false)
