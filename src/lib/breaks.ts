import { NumVal } from '../types'

export type BreakOptions = {
	tablet?: NumVal
	sdesk?: NumVal
	ldesk?: NumVal
	[x: string]: any
}
export type Breaks = {
	tablet: NumVal
	sdesk: NumVal
	ldesk: NumVal
}
export type Medias = {
	mobile: string
	tablet: string
	sdesk: string
	ldesk: string
}

export const defaultBreaks = {
	tablet: {
		num: 767,
		val: '767px',
	},
	sdesk: {
		num: 1112,
		val: '1112px',
	},
	ldesk: {
		num: 1480,
		val: '1480px',
	},
}

export const createBreaks = (options: BreakOptions = {}): Breaks => {
	const config = {
		...defaultBreaks,
		...options,
	}

	return config
}

export const createMediaQuery = ({
	min,
	max,
	ratio,
	orientation,
}: {
	min?: string
	max?: string
	ratio?: string
	orientation?: string
}) =>
	`@media only screen ${min ? `and (min-width: ${min})` : ''} ${
		max ? `and (max-width: ${max})` : ''
	} ${ratio ? `and (-webkit-min-device-pixel-ratio: ${ratio}px)` : ''} ${
		orientation ? `and (orientation: ${orientation})` : ''
	}`

export const createMediaQueries = (options: BreakOptions = {}) => {
	const config = createBreaks(options)

	return {
		mobile: createMediaQuery({ max: `${config.tablet.num - 1}px` }),
		tablet: createMediaQuery({ min: config.tablet.val }),
		sdesk: createMediaQuery({ min: config.sdesk.val }),
		ldesk: createMediaQuery({ min: config.ldesk.val }),
	}
}
