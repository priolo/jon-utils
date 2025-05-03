

/**
 * Stringifies a JSON object (not any randon JS object).
 *
 * It should be noted that JS objects can have members of
 * specific type (e.g. function), that are not supported
 * by JSON.
 *
 * @param obj JSON object
 * @returns stringified JSON object.
 */
export function jsonStream(obj: any): string {
	if (Array.isArray(obj)) {
		return JSON.stringify(obj.map(i => jsonStream(i)))
	} else if (typeof obj === 'string') {
		return `"${obj}"`
	} else if (typeof obj === 'object' && obj !== null) {
		return Object.keys(obj)
			.sort()
			.map(k => `${k}:${jsonStream(obj[k])}`)
			.join('|')
	}

	return obj
}

/**
 * restituisce un numero che indica l'hash della stringa passata come parametro
 * @param str stringa da cui calcolare l'hash 
 */
export function hashCode(str: string): number {
	let hash = 0, i, chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}


