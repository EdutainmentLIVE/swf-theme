export type TimeOptions = {
	short?: number
	med?: number
	long?: number
	ease?: string
	[x: string]: any
}

export type Times = {
	tranS: string
	tranM: string
	tranL: string
	short: number
	med: number
	long: number
	ease: string
}

export const defaultTimes = {
	short: 100,
	med: 250,
	long: 500,
	ease: 'ease-in-out',
}

export const createTimes = (options: TimeOptions = {}): Times => {
	const config = {
		...defaultTimes,
		...options,
	}
	return {
		tranS: `${config.short}ms ${config.ease}`,
		tranM: `${config.med}ms ${config.ease}`,
		tranL: `${config.long}ms ${config.ease}`,
		...config,
	}
}
