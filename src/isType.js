
/**
 * @param {object} value objet to test
 * @returns { boolean } if obj is an Object, including an Array.
 */
export function isObject(value) {
    return value !== null && typeof value === 'object'
}

/**
 * @param {object} value objet to test
 * @returns { boolean } if obj is an Object NOT including an Array.
 */
export function isObjectStrict(value) {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
}

/**
 * @param {object} value objet to test
 * @returns { boolean } if obj is an String.
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String
}
