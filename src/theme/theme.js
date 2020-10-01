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

export * from '../lib/gradient.helpers'

export const createTheme = (configuration = {}, styleComponentsGlobalStylesFunc) => {
	// Build exports using provided configuration

	if (isFunction(configuration)) styleComponentsGlobalStylesFunc = configuration


	const config = configuration

	// insert any missing options from the defaults
	const theme = defaultsDeep(config, defaultConfig)

	theme.fluidFontSize = fluidFontSize

	theme.css = config.css

	theme.breaks = generateBreaks(config)

	theme.times = generateTimes(config)

	theme.colors = generateColors(config)

	theme.media = generateMediaQueries(config)

	theme.fonts = generateFonts(config)

	theme.addCSS = css => (theme.css = css)

	if (styleComponentsGlobalStylesFunc !== false && config.printLog !== false) {
		const emoji = String.fromCodePoint(0x1f44d)
		console.info(
			`%c${emoji} SwF Theme - initialized${config.context ? ` from [${config.context}]` : ''}:`,
			`color: ${theme.colors.white.val}; background-color: ${theme.colors.ok.val}; padding: 4px;`,
			{
				config,
				theme,
			}
		)
	}

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
