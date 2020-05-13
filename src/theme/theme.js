import isFunction from 'lodash/isFunction'
import defaultsDeep from 'lodash/defaultsDeep'

import React, { useContext } from 'react'
import { ThemeContext, ThemeProvider as StyledProvider } from 'styled-components'

import defaultConfig from '../defaults'

import { generateMediaQueries } from '../lib/media.helpers'
import { generateGlobalStyles } from '../lib/globalStyles.helpers'
import { generateColors } from '../lib/color.helpers'
import { generateFonts, fluidFontSize } from '../lib/font.helpers'
import { generateBreaks } from '../lib/breakpoint.helpers'
import { generateTimes } from '../lib/times.helpers'

export { default as FullPalette } from '../components/FullPalette'
export { default as Palette } from '../components/Palette'

export const createTheme = (configuration = {}, styleComponentsGlobalStylesFunc) => {
	// Build exports using provided configuration
	// NOTE: order here is important!

	if (isFunction(configuration)) styleComponentsGlobalStylesFunc = configuration

	const config = configuration

	// insert any missing options from the defaults
	defaultsDeep(config, defaultConfig)

	const breaks = generateBreaks(config)

	const times = generateTimes(config)

	const colors = generateColors(config)

	const media = generateMediaQueries(config)

	const fonts = generateFonts(config)

	if (styleComponentsGlobalStylesFunc !== false)
		console.info(
			'SwF Theme initialized with config options: ',
			config,
			' | color methods: ',
			colors
		)

	return {
		config,
		breaks,
		times,
		media,
		colors,
		fonts,
		fluidFontSize,
	}
}

export const ThemeProvider = ({ theme, children }) => {
	const currentTheme = theme ? theme : createTheme()

	return <StyledProvider theme={currentTheme}>{children}</StyledProvider>
}

export const useTheme = () => useContext(ThemeContext)

export const createGlobalStyles = (theme, opts) => {
	return generateGlobalStyles(theme, opts)
}
