import reduce from 'lodash/reduce'
import { SwfColor } from './SwfColor'

export type ColorOptions = {
	primary?: string
	secondary?: string
	aux1?: string
	aux2?: string

	blue?: string
	brown?: string
	orange?: string
	purple?: string
	slate?: string
	midnight?: string

	ok?: string
	err?: string
	warn?: string
	disabled?: string
	text?: string

	grey?: string
	black?: string
	white?: string

	[x: string]: any
}

export type ColorValues = {
	primary: string
	secondary: string
	aux1: string
	aux2: string

	blue: string
	brown: string
	orange: string
	purple: string
	slate: string
	midnight: string

	ok: string
	err: string
	warn: string
	disabled: string
	text: string

	grey: string
	black: string
	white: string
	[x: string]: string
}

export type Colors = {
	primary: SwfColor
	secondary: SwfColor
	aux1: SwfColor
	aux2: SwfColor

	blue: SwfColor
	brown: SwfColor
	orange: SwfColor
	purple: SwfColor
	slate: SwfColor
	midnight: SwfColor

	ok: SwfColor
	err: SwfColor
	warn: SwfColor
	disabled: SwfColor
	text: SwfColor

	grey: SwfColor
	black: SwfColor
	white: SwfColor
	[x: string]: SwfColor
}

export type FallbackOptions = {
	tint?: number
	lighten?: number
	brighten?: number
	darken?: number
	saturate?: number
	desaturate?: number
}

export type Fallbacks = {
	tint: number
	lighten: number
	brighten: number
	darken: number
	saturate: number
	desaturate: number
}

export const defaultFallbacks = {
	tint: 25,
	lighten: 25,
	brighten: 25,
	darken: 20,
	saturate: 40,
	desaturate: 40,
}

export const defaultColors = {
	primary: '#0569b1',
	secondary: '#f7a707',
	aux1: '#7990ad',
	aux2: '#79a6ad',

	blue: '#0e8be4',
	brown: '#866f3c',
	purple: '#7032d0',
	orange: '#e88d00',
	slate: '#3a3f42',
	midnight: '#1c1e1f',

	ok: '#5bbb12',
	err: '#df1500',
	warn: '#ff9900',
	disabled: '#c0c4c5',
	text: '#3a3f42',

	grey: '#868b8d',
	black: '#000',
	white: '#FFF',
}

export const createColors = (
	options: { colors?: ColorOptions; fallbacks?: FallbackOptions } = {}
): Colors => {
	const colors = {
		...defaultColors,
		...(options.colors || {}),
	}
	const fallbacks = {
		...defaultFallbacks,
		...(options.fallbacks || {}),
	}

	return reduce(
		colors,
		(acc: any, _, key) => {
			acc[key] = new SwfColor(key, { colors, fallbacks })
			return acc
		},
		{}
	)
}
