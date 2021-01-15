import {
	BreakOptions,
	Breaks,
	createBreaks,
	createMediaQueries,
	defaultBreaks,
	Medias,
} from './breaks'
import {
	ColorOptions,
	Colors,
	createColors,
	defaultColors,
	defaultFallbacks,
	FallbackOptions,
} from './colors'
import { createSizes, defaultSizes, SizeOptions, Sizes } from './sizes'
import { createTimes, defaultTimes, TimeOptions, Times } from './times'

import { createFonts, fluidFontSize, FontOptions, Fonts, generateHsizes } from './fonts'

export type ThemeConfig = {
	colors?: ColorOptions
	colorFallbacks?: FallbackOptions
	sizes?: SizeOptions
	breaks?: BreakOptions
	times?: TimeOptions
	fonts?: FontOptions
}

export type ThemeOptions = ThemeConfig & {
	printLogs?: boolean
	context?: string
}

export type Theme = {
	colors: Colors
	sizes: Sizes
	breaks: Breaks
	media: Medias
	times: Times
	config: ThemeConfig
	fonts: Fonts
}

export const createTheme: <T>(options?: ThemeOptions & T) => Theme = options => {
	const { printLogs, context, ...opts } = options || {}

	const config = {
		colors: defaultColors,
		colorFallbacks: defaultFallbacks,
		breaks: defaultBreaks,
		sizes: defaultSizes,
		times: defaultTimes,
		...(opts || {}),
	}

	const { colors, colorFallbacks, sizes, breaks, times, fonts, ...customProperties } =
		(opts as ThemeConfig) || {}

	const theme: any = {
		colors: createColors({ colors, fallbacks: colorFallbacks }),
		sizes: createSizes(sizes),
		breaks: createBreaks(breaks),
		media: createMediaQueries(breaks),
		times: createTimes(times),
		fonts: createFonts(fonts),
		...customProperties,
	}

	if (printLogs) {
		const emoji = String.fromCodePoint(0x1f44d)
		console.info(
			`%c${emoji} SwF Theme - initialized${context ? ` from [${context}]` : ''}:`,
			`color: ${theme.colors.white.val}; background-color: ${theme.colors.ok.val}; padding: 4px;`,
			{
				theme,
				config,
			}
		)
	}

	theme.config = config

	return theme
}
