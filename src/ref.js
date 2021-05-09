/* eslint eqeqeq: "off" */

/**
 * @return if obj is an Object, including an Array.
 * @param {object}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object';
}

/**
 * Fa un controllo "weak" tra due oggetti
 * @param {object} v1 oggetto da confrontare
 * @param {object} v2 oggetto da confrontare
 */
export function isEqual(v1, v2) {
    return Object.is(v1, v2);
}

/**
 * Fa un controllo "deep" tra due oggetti
 * @param {object} v1 
 * @param {object} v2 
 */
export function isEqualDeep(v1, v2) {
    if (!isObject(v1) || !isObject(v2)) {
        return isEqual(v1, v2);
    }
    for (let key in v1) {
        if (!isEqualDeep(v1[key], v2[key])) return false;
    }
    for (let key in v2) {
        if (!v1.hasOwnProperty(key)) return false;
    }
    return true;
}

/**
 * Fa un clone "deep" di un oggetto
 * @param {*} obj oggetto da clonare
 */
export function cloneDeep(obj) {
    if (obj == undefined) return undefined;
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Fa un clone "weak" di un oggetto
 * @param {object} obj oggetto da clonare
 */
export function clone(obj) {
    return { ...obj };
}


/**
 * Deep merge from two object
 * not merge array
 */
export function merge(from, to) {
    return Object.keys(from).reduce((merged, key) => {
        if (from[key] instanceof Object && !Array.isArray(from[key])) {
            merged[key] = merge(from[key], merged[key] ?? {})
        } else {
            merged[key] = from[key]
        }
        return merged
    }, { ...to })
}
