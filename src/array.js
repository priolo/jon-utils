


/**
 * raggruppa un array in base ad un callback 
 * che restituisce (true/false) se due elementi fanno parte dello stesso gruppo o no
 * @param {*} array 
 * @param {*} callback 
 * @returns 
 */
 export function groupBy(array, callback) {
	return array.reduce((groups, item) => {
		let groupEq = groups.find(group => callback(group[0], item))
		if (!groupEq) {
			groupEq = []
			groups.push(groupEq)
		}
		groupEq.push(item)
		return groups
	}, [])
}