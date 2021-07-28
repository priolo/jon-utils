

export function memoize(func) {
	const results = {}
	return (...args) => {
		const argsKey = JSON.stringify(args)
		let res = results[argsKey]
		if (!res) {
			res = func(...args)
			results[argsKey] = res
		}
		return res
	}
}
