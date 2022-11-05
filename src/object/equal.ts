import { isObject } from "./isType"


/**
 * Fa un controllo "weak" tra due oggetti
 * @param v1 oggetto da confrontare
 * @param v2 oggetto da confrontare
 */
export function isEqual(v1: any, v2: any, options: any) {
    if ( options.ignoreUndefined && v1 == null && v2 == null)  return true
    return Object.is(v1, v2);
}

/**
 * Fa un controllo "deep" tra due oggetti
 * @param v1 oggetto da confrontare
 * @param v2 oggetto da confrontare
 */
export function isEqualDeep(v1: any, v2: any, options = {}) {
    if (!isObject(v1) || !isObject(v2)) {
        return isEqual(v1, v2, options);
    }
    for (let key in v1) {
        if (!isEqualDeep(v1[key], v2[key], options)) return false;
    }
    for (let key in v2) {
        if (!v1.hasOwnProperty(key)) return false;
    }
    return true;
}