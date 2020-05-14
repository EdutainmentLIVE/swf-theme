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

	const theme = {
		fluidFontSize,
	}

	const config = configuration

	// insert any missing options from the defaults
	defaultsDeep(config, defaultConfig)

	theme.css = config.css

	theme.breaks = generateBreaks(config)

	theme.times = generateTimes(config)

	theme.colors = generateColors(config)

	theme.media = generateMediaQueries(config)

	theme.fonts = generateFonts(config)

	theme.addCSS = css => (theme.css = css)

	if (styleComponentsGlobalStylesFunc !== false)
		console.info('SwF Theme initialized with config options: ', config, ' | theme: ', theme)

	return theme
}

export const ThemeProvider = ({ theme, children }) => {
	const currentTheme = theme ? theme : createTheme()

	return <StyledProvider theme={currentTheme}>{children}</StyledProvider>
}

export const useTheme = () => useContext(ThemeContext)

export const createGlobalStyles = (theme, opts) => {
	return generateGlobalStyles(theme, opts)
}
