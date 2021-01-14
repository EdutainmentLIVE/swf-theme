import { NumVal } from '../types'

export type SizeOptions = {
	gutter?: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
	}
	header?: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
	}
}

export type Sizes = {
	gutter: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
	}
	header: {
		mobile?: NumVal
		tablet?: NumVal
		sdesk?: NumVal
	}
}

const defaultOptions = {
	gutter: {
		mobile: {
			num: 1.1,
			em: '1.1em',
		},
		sdesk: {
			num: 4,
			vw: '4vw',
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
	}
}
