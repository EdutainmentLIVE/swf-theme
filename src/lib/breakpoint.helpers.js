import get from 'lodash/get'

export const generateBreaks = config => {
	const { breaks } = config
	const { tablet, sdesk, ldesk, ...breakpoints } = breaks
	return {
		tablet: {
			px: `${get(tablet, 'num', tablet)}px`,
			num: get(tablet, 'num', tablet),
		},

		sdesk: {
			px: `${get(sdesk, 'num', sdesk)}px`,
			num: get(sdesk, 'num', sdesk),
		},

		ldesk: {
			px: `${get(ldesk, 'num', ldesk)}px`,
			num: get(ldesk, 'num', ldesk),
		},

		...breakpoints,
	}
}
