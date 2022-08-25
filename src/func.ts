
/** 
 * restituisce una funzione con una tabella di risposta ottimizzata per proprietà uguali 
 * */
export function memoize(func: (...args: any[]) => any) {
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
