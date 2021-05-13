/* eslint eqeqeq: "off" */
import { isObjectStrict } from "./isType";


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
    const fromIsObj = isObjectStrict(from)
    const toIsObj = isObjectStrict(to)
    
    if (!fromIsObj && !toIsObj) return null
    if (fromIsObj && !toIsObj) return { ...from }
    if (!fromIsObj && toIsObj) return { ...to }

    return Object.keys(from).reduce((merged, key) => {
        if (from[key] instanceof Object && !Array.isArray(from[key])) {
            merged[key] = merge(from[key], merged[key] ?? {})
        } else {
            merged[key] = from[key]
        }
        return merged
    }, { ...to })
}
