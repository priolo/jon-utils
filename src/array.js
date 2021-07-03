


/**
 * raggruppa un array in base ad un callback 
 * che restituisce (true/false) se due elementi fanno parte dello stesso gruppo o no
 * @param {*} activities 
 * @param {*} callback 
 * @returns 
 */
 export function groupBy(activities, callback) {
	return activities.reduce((groups, activity) => {
		let groupEq = groups.find(group => callback(group[0], activity))
		if (!groupEq) {
			groupEq = []
			groups.push(groupEq)
		}
		groupEq.push(activity)
		return groups
	}, [])
}