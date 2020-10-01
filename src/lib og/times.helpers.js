export const generateTimes = config => {
	return {
		transS: `${config.times.short}ms ${config.times.ease}`,
		transM: `${config.times.med}ms ${config.times.ease}`,
		transL: `${config.times.long}ms ${config.times.ease}`,
		...config.times,
	}
}
