export const createMediaQuery = ({ min, max, r, o }) =>
	`@media only screen ${min ? `and (min-width: ${min})` : ''} ${
		max ? `and (max-width: ${max})` : ''
	} ${r ? `and (-webkit-min-device-pixel-ratio: ${r}px)` : ''} ${
		o ? `and (orientation: ${o})` : ''
	}`

export const generateMediaQueries = config => {
	const { breaks, media } = config

	return {
		...media,
		mobile: createMediaQuery({ min: 300, max: breaks.tablet - 1 }),
		tablet: createMediaQuery({ min: breaks.tablet.px }),
		sdesk: createMediaQuery({ min: breaks.sdesk.px }),
		ldesk: createMediaQuery({ min: breaks.ldesk.px }),
	}
}
