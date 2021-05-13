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
 * 
 * @param {*} obj 
 * @param {string} path 
 */
export function explore(obj, path) {
	//if ( !isObject(obj) || !isString(path) ) return null
	debugger
	if (Array.isArray(obj)) {
		return obj.map((item, i) => {
			return explore(item, path)
		})
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		const ret = { parent: obj, key: path }
		return ret
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	const value = obj[key]
	// se non trova una corrispondenza con questa key vuol dire che non c'e' 
	if (value == undefined) return { error: "undefined", parent: obj, key }

	return explore(value, newPath)
}




export function includeMap(obj, paths) {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => merge(acc, include(obj, path)), {})
	return ret
}


export function include(obj, path) {
	//if ( !isObject(obj) || !isString(path) ) return null

	if (Array.isArray(obj)) {
		return obj.map((item, i) => include(item, path))
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		return { [path]: obj[path] }
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	const value = obj[key]
	return { [key]: include(value, newPath) }
}