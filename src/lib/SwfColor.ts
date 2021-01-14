import tinyColor from 'tinycolor2'
import { ColorValues, Fallbacks } from './colors'

type Config = {
	colors: ColorValues
	fallbacks: Fallbacks
}

export class SwfColor {
	val: string
	name: string

	private conf: {
		dark: number
		light: number
		tint: number
		desat: number
		sat: number

		black: string
		white: string
	}

	private config: Config

	constructor(colorName: string, config: Config) {
		// console.log('Creating new swfColor with color: ', colorName)
		const { darken, lighten, tint, desaturate, saturate } = config.fallbacks

		this.val = config.colors[colorName] ? config.colors[colorName] : colorName

		this.name = colorName
		this.conf = {
			dark: colorName === 'grey' ? darken * 1.5 : darken,
			light: lighten,
			tint,
			black: config.colors.black,
			white: config.colors.white,
			desat: desaturate,
			sat: saturate,
		}
		this.config = config
	}

	dark: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		let amount: number = this.conf.dark
		let preset: string | null = null
		if (typeof val === 'number') {
			if (val < 7) {
				preset = val.toString()
			} else amount = val
		} else if (typeof val === 'string') {
			preset = val
		}

		if (preset) {
			switch (preset) {
				case '0':
					amount = this.conf.dark * 0.4
					break
				case '1':
					amount = this.conf.dark * 0.6
					break
				case '2':
					amount = this.conf.dark * 0.8
					break
				case '3':
					amount = this.conf.dark
					break
				case '4':
					amount = this.conf.dark * 1.2
					break
				case '5':
					amount = this.conf.dark * 1.4
					break
				case '6':
					amount = this.conf.dark * 1.6
					break
				default:
				// we just use amount as is
			}
		}

		const Color = tinyColor(this.val).darken(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	light: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		let amount: number = this.conf.light
		let preset: string | null = null
		if (typeof val === 'number') {
			if (val < 7) {
				preset = val.toString()
			} else amount = val
		} else if (typeof val === 'string') {
			preset = val
		}

		if (preset) {
			switch (preset) {
				case '0':
					amount = this.conf.light * 0.4
					break
				case '1':
					amount = this.conf.light * 0.6
					break
				case '2':
					amount = this.conf.light * 0.8
					break
				case '3':
					amount = this.conf.light
					break
				case '4':
					amount = this.conf.light * 1.2
					break
				case '5':
					amount = this.conf.light * 1.4
					break
				case '6':
					amount = this.conf.light * 1.6
					break
				default:
				// we just use amount as is
			}
		}

		const Color = tinyColor(this.val).lighten(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	sat: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		let amount: number = this.conf.sat
		let preset: string | null = null
		if (typeof val === 'number') {
			if (val < 7) {
				preset = val.toString()
			} else amount = val
		} else if (typeof val === 'string') {
			preset = val
		}

		if (preset) {
			switch (preset) {
				case '0':
					amount = this.conf.sat * 0.4
					break
				case '1':
					amount = this.conf.sat * 0.6
					break
				case '2':
					amount = this.conf.sat * 0.8
					break
				case '3':
					amount = this.conf.sat
					break
				case '4':
					amount = this.conf.sat * 1.2
					break
				case '5':
					amount = this.conf.sat * 1.4
					break
				case '6':
					amount = this.conf.sat * 1.6
					break
				default:
				// we just use amount as is
			}
		}

		const Color = tinyColor(this.val).saturate(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	desat: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		let amount: number = this.conf.desat
		let preset: string | null = null
		if (typeof val === 'number') {
			if (val < 7) {
				preset = val.toString()
			} else amount = val
		} else if (typeof val === 'string') {
			preset = val
		}

		if (preset) {
			switch (preset) {
				case '0':
					amount = this.conf.desat * 0.4
					break
				case '1':
					amount = this.conf.desat * 0.6
					break
				case '2':
					amount = this.conf.desat * 0.8
					break
				case '3':
					amount = this.conf.desat
					break
				case '4':
					amount = this.conf.desat * 1.2
					break
				case '5':
					amount = this.conf.desat * 1.4
					break
				case '6':
					amount = this.conf.desat * 1.6
					break
				default:
				// we just use amount as is
			}
		}

		const Color = tinyColor(this.val).desaturate(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	tint: (val?: number) => SwfColor = (amount): SwfColor => {
		const tintAmount = typeof amount === 'number' ? amount * 0.01 : this.conf.tint
		const Color = tinyColor(this.val).setAlpha(tintAmount)
		return new SwfColor(Color.toString(), this.config)
	}

	invert: () => SwfColor = () => {
		const Color = tinyColor(this.val)
		let colorVal: string
		if (Color.isDark()) {
			colorVal = this.conf.white
		} else if (Color.isLight()) {
			colorVal = this.conf.black
		} else colorVal = Color.spin(180).toString()
		return new SwfColor(colorVal, this.config)
	}
}
