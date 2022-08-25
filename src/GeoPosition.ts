
const TILE_SIZE = 256


type GMPosition = {
	x: number,
	y: number,
}

/**
 * Restituisce un punto della mappa di google map secondo la loro proiezione
 * vedere anche:
 * https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 * @param {*} lat 
 * @param {*} lng 
 * @returns {x:number, y:number}
 */
export function gmPoint(lat:number, lng:number): GMPosition {
	let siny = Math.sin((lat * Math.PI) / 180);

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	siny = Math.min(Math.max(siny, -0.9999), 0.9999);

	return {
		x: TILE_SIZE * (0.5 + lng / 360),
		y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
	}
}

/**
 * Restituisce la distanza (in km) tra due posizioni longitude/latitude
 * vedere amche:
 * https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
 * @returns distanza in KM
 */
export function distance(lat1:number, lon1:number, lat2:number, lon2:number):number {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1)  // deg2rad below
	var dLon = deg2rad(lon2 - lon1)
	var squarehalfChordLength =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
	var angularDistance  = 2 * Math.atan2(Math.sqrt(squarehalfChordLength), Math.sqrt(1 - squarehalfChordLength))
	var distance = R * angularDistance  // Distance in km
	return distance
}

/**
 *	Converte da gradi a radianti
 **/
function deg2rad(deg:number):number {
	return deg * (Math.PI / 180)
}
