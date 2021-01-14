import { NumPx, NumVal } from '../types'

export type SizeOptions = {
	font?: {
		base?: NumPx
	}
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
}

export type Sizes = {
	font: {
		base: NumPx
	}
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

const defaultOptions = {
	font: {
		base: {
			num: 15,
			px: '15px',
		},
	},
	gutter: {
		mobile: {
			num: 1.1,
			em: '1.1em',
		},
		tablet: {
			num: 0.5,
			vw: '0.5vw',
		},
		sdesk: {
			num: 4,
			vw: '4vw',
		},
		ldesk: {
			num: 6,
			vw: '6vw',
		},
	},
	header: {
		mobile: {
			num: 40,
			px: '40px',
		},
		tablet: {
			num: 50,
			px: '50px',
		},
		sdesk: {
			num: 80,
			px: '80px',
		},
	},
}

export const createSizes = (options: SizeOptions = {}): Sizes => {
	return {
		...defaultOptions,
		...options,
	} as Sizes
}
