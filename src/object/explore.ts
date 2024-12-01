import { isString, isObject } from "./isType.js";
import { merge } from "./obj.js";

export const KEY_NOT_FOUND = "key-not-found"

interface Value {
	parent: any,
	key: string,
	error?: "key-not-found" | null
}

/**
 * Restituisce i riferimenti di tutte la "paths" trovate nell'albero delle "props" dell'oggetto "obj"
 * @param obj oggetto su cui fare la ricerca
 * @param paths path dei parametri da prendere in considerazione
  * @return un array di riferimenti che corrispondono alle "paths" passate  
 * `[...{ error: KEY_NOT_FOUND, parent: obj, key }]`
 */
export function exploreMap(obj:any, paths:string|string[], withError=false) : Value[] {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => acc.concat(explore(obj, path)), <Value[]>[])
		.flat()
	if ( !withError ) return ret.filter( prop => !prop.error )
	return ret
}

/**
 * Di "obj" restituisce i "Value" di un "obj" dato il suo "path"
 * Se "obj" è un Array allora restituisce un array di "Value"
 */
export function explore(obj:any, path:string): Value | Value[] {

	if (Array.isArray(obj)) {
		return obj.map((item, i) => {
			const ref = explore(item, path)
			return ref
		}).flat()
	}

	const index = path.indexOf(".")

	// è una foglia finisce qua!
	if (index == -1) {
		const ret:Value = { parent: obj, key: path }
		// se non trova una corrispondenza con questa key vuol dire che non c'e' 
		if (!(path in obj)) ret.error = KEY_NOT_FOUND
		return ret
	}

	// il viaggo continua...
	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	// se non trova una corrispondenza con questa key vuol dire che non c'e' 
	if (!(key in obj)) return { parent: obj, key, error: KEY_NOT_FOUND }
	const value = obj[key]
	return explore(value, newPath)
}

/**
 * Restituisce un oggetto, clonato "obj", con le sole proprietà indicate in "paths"
 */
export function includeMap(obj:any, paths:string[]): any {
	if (!Array.isArray(paths)) paths = [paths]
	const ret = paths
		.reduce((acc, path) => {
			const ret = include(obj, path)
			if ( ret == null ) return acc
			return merge(ret, acc)
		}, {})
	return ret
}

/**
 * Restituisce un oggetto, clonato "obj", con la sola proprietà indicata in "path"
 */
export function include(obj:any, path:string): any {
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