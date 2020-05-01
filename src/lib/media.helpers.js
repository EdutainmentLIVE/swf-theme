export const createMediaQuery = ({ min, max, r, o }) =>
	`@media only screen ${min ? `and (min-device-width: ${min})` : ''} ${
		max ? `and (max-device-width: ${max})` : ''
	} ${r ? `and (-webkit-min-device-pixel-ratio: ${r}px)` : ''} ${
		o ? `and (orientation: ${o})` : ''
	}`

export const generateMediaQueries = config => {
	const { breaks, media } = config

	return {
		...media,
		mobile: createMediaQuery({ min: 300, max: breaks.tablet - 1 }),
		tablet: createMediaQuery({ min: breaks.tablet }),
		sdesk: createMediaQuery({ min: breaks.sdesk }),
		ldesk: createMediaQuery({ min: breaks.ldesk }),
	}
}
