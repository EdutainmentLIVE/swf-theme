import tinyColor from 'tinycolor2'
import { ColorValues, Fallbacks } from './colors'

type Config = {
	colors: ColorValues
	fallbacks: Fallbacks
}

type Conf = {
	dark: number
	light: number
	bright: number
	tint: number
	desat: number
	sat: number

	black: string
	white: string
}

type CalcAmountOpts = {
	val?: number | string
	fallback: number
}

const calcAmount = ({ val, fallback }: CalcAmountOpts): number => {
	let amount = fallback
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
				amount = fallback * 0.4
				break
			case '1':
				amount = fallback * 0.6
				break
			case '2':
				amount = fallback * 0.8
				break
			case '3':
				amount = fallback
				break
			case '4':
				amount = fallback * 1.2
				break
			case '5':
				amount = fallback * 1.4
				break
			case '6':
				amount = fallback * 1.6
				break
			default:
			// we just use amount as is
		}
	}

	return amount
}

export class SwfColor {
	val: string
	name: string

	private conf: Conf

	private config: Config

	constructor(colorName: string, config: Config) {
		// console.log('Creating new swfColor with color: ', colorName)
		const { darken, lighten, brighten, tint, desaturate, saturate } = config.fallbacks

		this.val = config.colors[colorName] ? config.colors[colorName] : colorName

		this.name = colorName
		this.conf = {
			dark: colorName === 'grey' ? darken * 1.5 : darken,
			light: lighten,
			bright: brighten,
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
		const amount = calcAmount({ val, fallback: this.conf.dark })

		const Color = tinyColor(this.val).darken(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	light: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		const amount = calcAmount({ val, fallback: this.conf.light })

		const Color = tinyColor(this.val).lighten(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	bright: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		const amount = calcAmount({ val, fallback: this.conf.bright })

		const Color = tinyColor(this.val).brighten(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	sat: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		const amount = calcAmount({ val, fallback: this.conf.sat })

		const Color = tinyColor(this.val).saturate(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	desat: (
		val?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | number
	) => SwfColor = val => {
		const amount = calcAmount({ val, fallback: this.conf.desat })

		const Color = tinyColor(this.val).desaturate(amount)
		return new SwfColor(Color.toString(), this.config)
	}

	tint: (val?: number) => SwfColor = (amount): SwfColor => {
		let tintAmount = typeof amount === 'number' ? amount : this.conf.tint
		tintAmount = tintAmount * 0.01 // convert to css opacity value
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
