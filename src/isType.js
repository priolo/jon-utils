
/**
 * if obj is an Object, including an Array.
 * @param {object} value
 * @returns {boolean}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object'
}

/**
 * Controlla che sia un oggetto, se Array restituisce false
 * @param {object} value 
 * @returns {boolean}
 */
export function isObjectStrict(value) {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
}

/**
 * Controlla che sia una STRING
 * @param {*} value 
 * @returns {boolean}
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String
}

/**
 * Controlla che sia un URL valido
 * https://stackoverflow.com/a/43467144/5224029
 * @param {string} value 
 * @returns {boolean}
 */
export function isUrl(value) {
    return !!getUrlFromString(value)
}

export function isUrlImage(value) {
    const url = getUrlFromString(value)
    if ( !url ) return false
    const ext = url.pathname.split('.').pop()
    return ["jpg", "jpeg", "png", "gif"].includes(ext.toLowerCase())
}

function getUrlFromString ( value ) {
    let url
    try {
        url = new URL(value)
    } catch (_) {
        return null  
    }
    return (url.protocol === "http:" || url.protocol === "https:") ? url : null
}


