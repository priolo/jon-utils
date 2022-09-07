
/**
 * if obj is an Object, including an Array.
 */
export function isObject(value:any) : boolean {
    return value !== null && typeof value === 'object'
}

/**
 * Controlla che sia un oggetto, se Array restituisce false
 */
export function isObjectStrict(value:any) : boolean {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
}

/**
 * Controlla che sia una STRING
 */
export function isString(value:any) : boolean {
    return typeof value === 'string' || value instanceof String
}

/**
 * Controlla che sia un URL valido
 * https://stackoverflow.com/a/43467144/5224029
 */
export function isUrl(value:string) : boolean {
    return !!getUrlFromString(value)
}

export function isUrlImage(value:string) : boolean {
    const url = getUrlFromString(value)
    if ( !url ) return false
    const ext = url.pathname.split('.').pop()
    if ( ext == null ) return false
    return ["jpg", "jpeg", "png", "gif"].includes(ext.toLowerCase())
}

/**
 * Semplicemente trasforma una stringa in un URL valido
 */
function getUrlFromString ( value:string ) : URL | null {
    let url
    try {
        url = new URL(value)
    } catch (_) {
        return null  
    }
    return (url.protocol === "http:" || url.protocol === "https:") ? url : null
}
