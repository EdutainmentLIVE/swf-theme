/*
 =================================================
  SwF THEME
 =================================================
* */
import defaultsDeep from 'lodash/defaultsDeep'
import isFunction from 'lodash/isFunction'

import defaultConfig from '../defaults'
import { generateMediaQueries } from '../lib/media.helpers'
import { generateGlobalStyles } from '../lib/globalStyles.helpers'
import { generateColors } from '../lib/color.helpers'
import { generateFonts, fluidFontSize as calcFluidFont } from '../lib/font.helpers'
import { generateBreaks } from '../lib/breakpoint.helpers'
import { generateTimes } from '../lib/times.helpers'

// const buildConfig = (newConfig, lastConfig) => {
// 	const newConfig = defaultsDeep(configuration, defaultConfig)

// 	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
// 		// Browser has dark mode enabled
// 		newConfig.colors = defaultsDeep(newConfig.darkMode.colors, newConfig.colors)
// 		newConfig.isDarkMode = true
// 	}

// 	return newConfig
// }

/*
 =================================================
  EXPORTS
 =================================================
* */

export let config
export let breaks
export let times
export let media
export let colors
export let fonts
export let GlobalStyles
export const fluidFontSize = calcFluidFont

export const createTheme = (configuration = {}, styleComponentsGlobalStylesFunc) => {
	// Build exports using provided configuration
	// NOTE: order here is important!

	if (isFunction(configuration)) styleComponentsGlobalStylesFunc = configuration

	config = configuration

	// add any missing options from the defaults
	defaultsDeep(config, defaultConfig)

	breaks = generateBreaks(config)

	times = generateTimes(config)

	colors = generateColors(config)

	media = generateMediaQueries(config)

	fonts = generateFonts(config)

	GlobalStyles = generateGlobalStyles(
		{ ...config, colors, fonts, media, breaks },
		styleComponentsGlobalStylesFunc
	)

	if (styleComponentsGlobalStylesFunc !== false)
		console.info('SwF Theme initialized with config: ', config, ' | and colors: ', colors)

	return {
		breaks,
		times,
		media,
		colors,
		fonts,
		GlobalStyles,
		fluidFontSize,
	}
}

createTheme(defaultConfig, false)
