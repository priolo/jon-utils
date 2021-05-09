
/**
 * Permette di ignorare dei parametri secodno uno schema
 * @param {*} obj oggetto da cui bisogna togliere i parametri ignorati
 * @param {*} ign schema pdi parametri ignorati
 */
export function exploreMap(obj, paths, callback) {
	if (!Array.isArray(paths)) paths = [paths]
	paths
		.reduce((acc, path) => acc.concat(explore(obj, path)), [])
		.flat()
		.forEach(act => callback(act));
}

/**
 * 
 * @param {*} obj 
 * @param {string} path 
 */
export function explore(obj, path) {

	if (Array.isArray(obj)) {
		return obj.map(item => {
			return explore(item, path)
		})
	}

	const index = path.indexOf(".")
	if (index == -1) {
		return {
			parent: obj,
			key: path,
		}
	}

	const key = path.slice(0, index)
	const newPath = path.slice(index + 1)
	const value = obj[key]
	return explore(value, newPath)

}