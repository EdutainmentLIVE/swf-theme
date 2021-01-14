import { BreakOptions, Breaks, createBreaks, createMediaQueries, Medias } from './breaks'
import { ColorOptions, Colors, createColors, FallbackOptions } from './colors'
import { createSizes, SizeOptions, Sizes } from './sizes'
import { createTimes, TimeOptions, Times } from './times'

export type ThemeConfig = {
	colors?: ColorOptions
	colorFallbacks?: FallbackOptions
	sizes?: SizeOptions
	breaks?: BreakOptions
	times?: TimeOptions
}

export type Theme = {
	colors: Colors
	sizes: Sizes
	breaks: Breaks
	media: Medias
	times: Times
	config: ThemeConfig
}

export const createTheme = (config: ThemeConfig): Theme => {
	return {
		colors: createColors({ colors: config?.colors, fallbacks: config?.colorFallbacks }),
		sizes: createSizes(config?.sizes),
		breaks: createBreaks(config?.breaks),
		media: createMediaQueries(config?.breaks),
		times: createTimes(config?.times),
		config,
	}
}
