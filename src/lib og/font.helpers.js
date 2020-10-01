import round from 'lodash/round'

export const generateHsizes = (opts = {}) => {
	const { hUnit = 'em', hMax = 4, hMin = 1.1 } = opts

	return Array(6)
		.fill('')
		.reduce((acc, _, i) => {
			const num = round(hMax - ((hMax - hMin) / 5) * i, 2)
			const key = `h${i + 1}`
			const res = acc
			res[key] = {
				num,
			}
			res[key][hUnit] = `${num}${hUnit}`
			return res
		}, {})
}

export const fluidFontSize = ({
	maxSize = 25,
	minSize = 15,
	minViewport = 320,
	maxViewport = 1480,
}) =>
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

export const generateFonts = config => {
	const { fonts } = config
	const { sizes } = fonts
	const hSizes = generateHsizes(fonts)

	return {
		...fonts,
		sizes: {
			...sizes,
			...hSizes,
		},
	}
}
