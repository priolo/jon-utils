
/**
 * @return if obj is an Object, including an Array.
 * @param {object}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object'
}

export function isObjectStrict(value) {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
}

export function isString(value) {
    return typeof value === 'string' || value instanceof String
}
