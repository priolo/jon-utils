import { isString, isObject } from "./isType";
import { merge } from "./ref";

export const KEY_NOT_FOUND = "key-not-found"

/**
 * Restituisce i riferimenti di tutte la "paths" trovate nell'albero delle "props" dell'oggetto "obj"
 * @param {*} obj oggetto su cui fare la ricerca
 * @param {string|string[]} paths path dei parametri da prendere in considerazione
  * @return {object[]} un array di riferimenti che corrispondono alle "paths" passate  
 * `[...{ error: KEY_NOT_FOUND, parent: obj, key }]`
 */
export function exploreMap(obj, paths, withError=false) {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => acc.concat(explore(obj, path)), [])
		.flat()
	if ( !withError ) return ret.filter( prop => !prop.error )
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
			const ref = explore(item, path)
			return ref
		})
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		const ret = { parent: obj, key: path }
		// se non trova una corrispondenza con questa key vuol dire che non c'e' 
		if (!(path in obj)) ret.error = KEY_NOT_FOUND
		return ret
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	// se non trova una corrispondenza con questa key vuol dire che non c'e' 
	if (!(key in obj)) return { error: KEY_NOT_FOUND, parent: obj, key }
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