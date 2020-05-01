import isString from 'lodash/isString'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import defaultsDeep from 'lodash/defaultsDeep'
import isPlainObject from 'lodash/isPlainObject'

import tinyColor from 'tinycolor2'

/**
 *  GENERIC COLOR HANDLER
 *  this accepts either an options object or string
 *  strings can be used to access presets - e.g., colors.primary('dark')
 * */

const colorHandler = (colorName, config, opts) => {
	let { darkenAmount, lightenAmount, tintOpacity } = config.colorSettings
	const { black, white } = config.colors

	const rawColor = config.colors[colorName]
	if (!opts) return rawColor

	if (colorName === 'grey') darkenAmount = darkenAmount * 1.5

	// console.log('beginning with color: ', rawColor, ' and options: ', opts)

	let Color = tinyColor(rawColor)

	if (isPlainObject(opts)) {
		if (get(opts, 'opacity')) Color.setAlpha(opts.opacity)

		if (get(opts, 'lighten')) Color.lighten(opts.lighten)

		if (get(opts, 'darken')) Color.darken(opts.darken)

		if (get(opts, 'brighten')) Color.brighten(opts.brighten)

		if (get(opts, 'desat')) Color.desaturate(opts.desat)

		if (get(opts, 'sat')) Color.saturate(opts.sat)

		if (get(opts, 'invert')) {
			if (Color.isDark()) Color = tinyColor(white)
			else if (Color.isLight()) Color = tinyColor(black)
			else Color.spin(180)
		}
	}

	if (isString(opts)) {
		switch (opts) {
			case 'dark':
				Color.darken(darkenAmount)
				break
			case 'dark0':
				Color.darken(darkenAmount * 0.4)
				break
			case 'dark1':
				Color.darken(darkenAmount * 0.6)
				break
			case 'dark2':
				Color.darken(darkenAmount * 0.8)
				break
			case 'dark3':
				Color.darken(darkenAmount)
				break
			case 'dark4':
				Color.darken(darkenAmount * 1.2)
				break
			case 'dark5':
				Color.darken(darkenAmount * 1.4)
				break
			case 'dark6':
				Color.darken(darkenAmount * 1.6)
				break

			case 'light':
				Color.lighten(lightenAmount)
				break
			case 'light0':
				Color.lighten(lightenAmount * 0.4)
				break
			case 'light1':
				Color.lighten(lightenAmount * 0.6)
				break
			case 'light2':
				Color.lighten(lightenAmount * 0.8)
				break
			case 'light3':
				Color.lighten(lightenAmount)
				break
			case 'light4':
				Color.lighten(lightenAmount * 1.2)
				break
			case 'light5':
				Color.lighten(lightenAmount * 1.4)
				break
			case 'light6':
				Color.lighten(lightenAmount * 1.6)
				break

			case 'tint':
				Color.setAlpha(tintOpacity)
				break
			case 'tint05':
				Color.setAlpha(0.05)
				break
			case 'tint10':
				Color.setAlpha(0.1)
				break
			case 'tint20':
				Color.setAlpha(0.2)
				break
			case 'tint30':
				Color.setAlpha(0.3)
				break
			case 'tint40':
				Color.setAlpha(0.4)
				break
			case 'tint50':
				Color.setAlpha(0.5)
				break
			case 'tint60':
				Color.setAlpha(0.6)
				break
			case 'tint70':
				Color.setAlpha(0.7)
				break
			case 'tint80':
				Color.setAlpha(0.8)
				break
			case 'tint90':
				Color.setAlpha(0.9)
				break
			default:
				console.warn('theme.color handler - Unsupported options: ', opts)
			// don't do anything
		}
	}

	// console.log('theme.color handler - finished color: ', Color.toString())
	return Color.toString()
}

/**
 *  CREATES COLOR HANDLERS
 *  will return object with color handler methods for each color defined in the config
 *  e.g., colors.primary()
 * */
const generateColorHandlers = (colors, config) =>
	reduce(
		colors,
		(acc, _, key) => {
			const res = acc
			res[key] = opts => colorHandler(key, config, opts)
			return res
		},
		{}
	)

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

export const generateColors = config => {
	const { colors, colorSettings, isDarkMode } = config
	const newColors = generateColorHandlers(colors, config)
	return {
		colorSettings: defaultsDeep(colorSettings),
		disabled: isDarkMode ? newColors.grey('dark4') : newColors.grey('light4'),
		...newColors,
	}
}
