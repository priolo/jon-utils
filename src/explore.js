import { isString, isObject } from "./isType";
import { merge } from "./ref";



/**
 * Permette di eseguire un callback sui parametri indicati nelle paths
 * @param {*} obj oggetto su cui applicare il callback
 * @param {string[]} paths path dei parametri da prendere in considerazione
 * @param {Function} callback 
 */
export function exploreMap(obj, paths, withError=false) {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => acc.concat(explore(obj, path)), [])
		.flat()
	if ( !withError ) ret.filter( prop => !prop.error )
	return ret
}

/**
 * FIND
 * @param {*} obj 
 * @param {string} path 
 */
export function explore(obj, path) {
	//if ( !isObject(obj) || !isString(path) ) return null

	if (Array.isArray(obj)) {
		return obj.map((item, i) => {
			return explore(item, path)
		})
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		const ret = { parent: obj, key: path }
		// se non trova una corrispondenza con questa key vuol dire che non c'e' 
		if (!(path in obj)) return ret.error = "undefined"
		return ret
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	// se non trova una corrispondenza con questa key vuol dire che non c'e' 
	if (!(key in obj)) return { error: "undefined", parent: obj, key }
	const value = obj[key]
	return explore(value, newPath)
}


export function includeMap(obj, paths) {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => {
			const ret = include(obj, path)
			if ( ret == null ) return acc
			return merge(ret, acc)
		}, {})
	return ret
}

export function include(obj, path) {
	if ( !isObject(obj) || !isString(path) ) return null

	if (Array.isArray(obj)) {
		return obj.map((item, i) => include(item, path))
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		if ( !(path in obj) ) return null
		return { [path]: obj[path] }
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	const value = obj[key]
	return { [key]: include(value, newPath) }
}