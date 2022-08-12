


/**
 * raggruppa un array in base ad un callback 
 * che restituisce (true/false) se due elementi fanno parte dello stesso gruppo o no
 * @param array Insieme da raggruppare
 * @param callback funzione che discrimina dove appartiene l'insieme
 * @returns 
 */
 export function groupBy<T>(array:T[], callback:(a:T,b:T)=>boolean): T[][]{
	return array.reduce<T[][]>((groups, item) => {
		let groupEq = groups.find(group => callback(group[0], item))
		if (!groupEq) {
			groupEq = []
			groups.push(groupEq)
		}
		groupEq.push(item)
		return groups
	}, [])
}