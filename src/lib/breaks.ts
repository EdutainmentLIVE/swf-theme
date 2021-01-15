import { NumPx } from '../types'

export type BreakOptions = {
	tablet?: NumPx
	sdesk?: NumPx
	ldesk?: NumPx
	[x: string]: any
}
export type Breaks = {
	tablet: NumPx
	sdesk: NumPx
	ldesk: NumPx
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
		px: '767px',
	},
	sdesk: {
		num: 1112,
		px: '1112px',
	},
	ldesk: {
		num: 1480,
		px: '1480px',
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
		tablet: createMediaQuery({ min: config.tablet.px }),
		sdesk: createMediaQuery({ min: config.sdesk.px }),
		ldesk: createMediaQuery({ min: config.ldesk.px }),
	}
}
