/*
 =================================================
  SwF THEME
 =================================================
* */
import get from 'lodash/get'
// import round from 'lodash/round'
import reduce from 'lodash/reduce'
import defaultsDeep from 'lodash/defaultsDeep'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import tinyColor from 'tinycolor2'
import defaultConfig from './defaults'

let config = defaultConfig

/**
 *  BUILD CONFIG FILE
 * */
// const getOppositeBrightness = themeColors =>
// 	reduce(
// 		themeColors,
// 		(acc, val, key) => {
// 			const newColors = acc
// 			const color = tinyColor(val)
// 			const brightness = color.getBrightness()
// 			const amount = round(
// 				Math.abs(100 - (Math.abs(brightness - 255) / 127) * 100)
// 			)
// 			newColors[key] =
// 				brightness < 128
// 					? color.lighten(amount).toString()
// 					: color.darken(amount).toString()
// 			return newColors
// 		},
// 		{}
// 	)

const buildConfig = configuration => {
	const res = defaultsDeep(configuration, defaultConfig)

	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		res.colors.black = res.colors.white
		res.colors.white = res.colors.black
	}
	return res
}

config = buildConfig()

/**
 *  GENERIC COLOR HANDLER
 *  this accepts either an options object or string
 *  strings can be used to access presets - e.g., colors.primary('dark')
 * */

const colorHandler = (c, opts) => {
	let { darkenAmount, lightenAmount, tintOpacity } = config.colorSettings
	const { black, white } = config.colors

	let rawColor = config.colors[c]
	if (!opts) return rawColor

	if (c === 'grey') darkenAmount = darkenAmount * 1.5

	// console.log('beginning with color: ', rawColor, ' and options: ', opts)

	let color = tinyColor(rawColor)

	if (isPlainObject(opts)) {
		if (get(opts, 'opacity')) color.setAlpha(opts.opacity)

		if (get(opts, 'lighten')) color.lighten(opts.lighten)

		if (get(opts, 'darken')) color.darken(opts.darken)

		if (get(opts, 'brighten')) color.brighten(opts.brighten)

		if (get(opts, 'desat')) color.desaturate(opts.desat)

		if (get(opts, 'sat')) color.saturate(opts.sat)

		if (get(opts, 'invert')) {
			if (color.isDark()) color = tinyColor(white)
			else if (color.isLight()) color = tinyColor(black)
			else color.spin(180)
		}
	}

	if (isString(opts)) {
		switch (opts) {
			case 'dark':
				color.darken(darkenAmount)
				break
			case 'dark0':
				color.darken(darkenAmount * 0.4)
				break
			case 'dark1':
				color.darken(darkenAmount * 0.6)
				break
			case 'dark2':
				color.darken(darkenAmount * 0.8)
				break
			case 'dark3':
				color.darken(darkenAmount)
				break
			case 'dark4':
				color.darken(darkenAmount * 1.2)
				break
			case 'dark5':
				color.darken(darkenAmount * 1.4)
				break
			case 'dark6':
				color.darken(darkenAmount * 1.6)
				break

			case 'light':
				color.lighten(lightenAmount)
				break
			case 'light0':
				color.lighten(lightenAmount * 0.4)
				break
			case 'light1':
				color.lighten(lightenAmount * 0.6)
				break
			case 'light2':
				color.lighten(lightenAmount * 0.8)
				break
			case 'light3':
				color.lighten(lightenAmount)
				break
			case 'light4':
				color.lighten(lightenAmount * 1.2)
				break
			case 'light5':
				color.lighten(lightenAmount * 1.4)
				break
			case 'light6':
				color.lighten(lightenAmount * 1.6)
				break

			case 'tint':
				color.setAlpha(tintOpacity)
				break
			case 'tint05':
				color.setAlpha(0.05)
				break
			case 'tint10':
				color.setAlpha(0.1)
				break
			case 'tint20':
				color.setAlpha(0.2)
				break
			case 'tint30':
				color.setAlpha(0.3)
				break
			case 'tint40':
				color.setAlpha(0.4)
				break
			case 'tint50':
				color.setAlpha(0.5)
				break
			case 'tint60':
				color.setAlpha(0.6)
				break
			case 'tint70':
				color.setAlpha(0.7)
				break
			case 'tint80':
				color.setAlpha(0.8)
				break
			case 'tint90':
				color.setAlpha(0.9)
				break
			default:
				console.warn('theme.color handler - Unsupported options: ', opts)
			// don't do anything
		}
	}

	// console.log('theme.color handler - finished color: ', color.toString())
	return color.toString()
}

/**
 *  CREATES COLOR HANDLERS
 *  will return object with color handler methods for each color defined in the config
 *  e.g., colors.primary()
 * */
const generateColorHandlers = () =>
	reduce(
		config.colors,
		(acc, _, key) => {
			const res = acc
			res[key] = opts => colorHandler(key, opts)
			return res
		},
		{}
	)

/*
 =================================================
  EXPORTS
 =================================================
* */

export let colors = generateColorHandlers()

export let breaks = get(config, 'breaks')

export const init = (configuration = {}) => {
	// We only initialize if a valid configuration is passed in
	if (isPlainObject(configuration)) {
		// 1. Rebuild config with incoming configurations
		config = buildConfig(configuration)

		// 2. Rebuild the theme exports
		colors = generateColorHandlers()
		breaks = get(config, 'breaks')
	}

	console.info('SwF Theme initialized with config: ', config)
}

export default config
