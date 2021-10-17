

export function email(value) {
	if (/^[^\s@]+@[^\s@]+$/.test(value)) return true
	return false
}

export function obligatory(value) {
	if (value != null && value.trim().length > 0) return true
	return false
}

export function obligatoryArray(value) {
	if (Array.isArray(value) && value.length > 0) return true
	return false
}

// https://stackoverflow.com/a/5717133/5224029
export function url(value) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	if (!!pattern.test(value)) return true
	return false
}

/**
 * 
 * @param {object} value 
 * @param {string} option 
 * @returns 
 */
export function verify(value, option) {
	if (!option) return true

	if (typeof option == "string") {
		const optional = option.charAt(0) == "?"
		if (optional) option = option.slice(1)
		if (optional && value == null) return true
		const [type, param] = option.split(":")

		switch (type) {
			case "email":
				return email(value)
			case "url":
				return url(value)
			case "string":
				if (typeof value != 'string') return false
				return operator(value.trim().length, param)
			case "array":
				if (!Array.isArray(value)) return false
				return operator(value.length, param)
			case "int":
				if (!Number.isInteger(value)) return false
				return operator(value, param)
			case "number":
				if (!Number.isFinite(value)) return false
				return operator(value, param)
		}
		return true
	}

	if (Array.isArray(option)) {
		return option.every(opt => verify(value, opt))
	}

	if (typeof option == "object") {
		const keys = Object.keys(option)
		for (const key of keys) {
			const newValue = value[key]
			const newOption = option[key]
			if (verify(newValue, newOption) == false) return false
		}
	}
	return true
}

function operator(value, operator) {
	if (operator == null || operator.length == 0) return true
	let op = operator.charAt(0)
	let param
	if (isNaN(op)) {
		param = +operator.slice(1)
	} else {
		op = "="
		param = +operator
	}
	switch (op) {
		case "=": return value == param
		case ">": return value > param
		case "<": return value < param
		case "!": return value != param
		default: return true
	}
}