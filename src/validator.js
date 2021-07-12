

export function email (v) {
	if (/^[^\s@]+@[^\s@]+$/.test(v)) return true
	return false
}

export function obligatory (v) {
	if (v != null && v.trim().length > 0) return true
	return false
}

export function obligatoryArray (v) {
	if (Array.isArray(v) && v.length > 0) return true
	return false
}

// https://stackoverflow.com/a/5717133/5224029
export function url (v) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	if (!!pattern.test(v)) return true
	return false
}