import { generateHsizes } from '../lib/font.helpers'

export const fonts = {
	baseSize: {
		px: '15px',
		num: 15,
	},
	textFamily: 'PT-Sans, sans-serif',
	titleFamily: 'PT-Sans, sans-serif',
	hMin: 1.1,
	hMax: 4,
	hUnit: 'em',
	sizes: generateHsizes(),
}

export default fonts
