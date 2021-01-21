import { NumVal } from '../types'
import { generateHsizes, HsizeOptions, Hsizes } from './fonts'

export type SizeOptions = {
	font?: {
		base?: NumVal
		h?: Hsizes
	} & HsizeOptions
	gutter?: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
		ldesk?: NumVal
	}
	header?: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
	}
	[x: string]: any
}

export type Sizes = {
	font: {
		base: NumVal
	} & Hsizes
	gutter: {
		mobile: NumVal
		tablet: NumVal
		sdesk: NumVal
		ldesk: NumVal
	}
	header: {
		mobile: NumVal
		tablet: NumVal
		sdesk: NumVal
	}
}

export const defaultSizes: Sizes = {
	font: {
		base: {
			num: 15,
			val: '15px',
		},
		...generateHsizes(),
	},
	gutter: {
		mobile: {
			num: 1.1,
			val: '1.1em',
		},
		tablet: {
			num: 0.5,
			val: '0.5vw',
		},
		sdesk: {
			num: 4,
			val: '4vw',
		},
		ldesk: {
			num: 6,
			val: '6vw',
		},
	},
	header: {
		mobile: {
			num: 40,
			val: '40px',
		},
		tablet: {
			num: 50,
			val: '50px',
		},
		sdesk: {
			num: 80,
			val: '80px',
		},
	},
}

export const createSizes = (options: SizeOptions = {}): Sizes => {
	return {
		...defaultSizes,
		...options,
	} as Sizes
}
