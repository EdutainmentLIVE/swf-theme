export const generateTimes = config => {
	return {
		tranS: `${config.times.short}ms ${config.times.ease}`,
		tranM: `${config.times.med}ms ${config.times.ease}`,
		tranL: `${config.times.long}ms ${config.times.ease}`,
		...config.times,
	}
}
