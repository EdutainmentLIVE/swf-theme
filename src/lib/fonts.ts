import round from 'lodash/round'

import { NumVal } from '../types'

export type GenerateHSizeOptions = {
	unit?: string
	max?: number
	min?: number
}
export type HsizeOptions = {
	h1?: NumVal
	h2?: NumVal
	h3?: NumVal
	h4?: NumVal
	h5?: NumVal
	h6?: NumVal
}
export type Hsizes = { h1: NumVal; h2: NumVal; h3: NumVal; h4: NumVal; h5: NumVal; h6: NumVal }

export const generateHsizes = (opts: GenerateHSizeOptions = {}): Hsizes => {
	const { unit = 'em', max = 4, min = 1.1 } = opts

	return Array(6)
		.fill('')
		.reduce((acc, _, i) => {
			const num = round(max - ((max - min) / 5) * i, 2)
			const key = `h${i + 1}`
			const res = acc
			res[key] = {
				num,
			}
			res[key][unit] = `${num}${unit}`
			return res
		}, {})
}

export type FluidFontSizeOptions = {
	maxSize?: number
	minSize?: number
	minViewport?: number
	maxViewport?: number
}

type FluidFontSize = (options?: FluidFontSizeOptions) => string

export const fluidFontSize = ({
	maxSize = 25,
	minSize = 15,
	minViewport = 320,
	maxViewport = 1480,
}: FluidFontSizeOptions = {}): string =>
	`
    font-size: calc(
      ${minSize}px + ${maxSize - minSize} *
        ((100vw - ${minViewport}px) / ${maxViewport - minViewport})
    );

    @media screen and (max-width: ${minViewport}px) {
      font-size: ${minSize}px;
    }
    @media screen and (min-width: ${maxViewport}px) {
      font-size: ${maxSize}px;
    }
  `

export type FontOptions = {
	textFamily?: string
	titleFamily?: string
}

export type Fonts = {
	textFamily: string
	titleFamily: string
	fluidFontSize: FluidFontSize
}

export const createFonts = (options: FontOptions = {}): Fonts => {
	const config = {
		textFamily: 'PT-Sans, sans-serif',
		titleFamily: 'PT-Sans, sans-serif',
		...options,
	}
	return {
		...config,
		fluidFontSize,
	} as Fonts
}
