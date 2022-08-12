/* eslint eqeqeq: "off" */
import { isObject, isObjectStrict } from "./isType";


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
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {Boolean} replaceNulls
 */
export function merge(obj1, obj2, replaceNulls = true) {
    if ( replaceNulls ) {
        if ( obj1==null && obj2!=null ) return obj2
        if ( obj1!=null && obj2==null ) return obj1
    }
    // se ci sono primitive, non sono confrontabili, manda la secondna
    if (!isObject(obj1) || !isObject(obj2)) return obj1
    // se sono due array fai il merge con funzione apposita
    if (Array.isArray(obj1) && Array.isArray(obj2)) return mergeArray(obj1, obj2)
    // se uno dei due è un array e l'altro un oggetto non sono confrontabili
    if (Array.isArray(obj1) || Array.isArray(obj2)) return obj1

    // sono due oggetti
    return Object.keys(obj1).reduce((merged, key) => {
        if ( obj2.hasOwnProperty(key) ) {
            merged[key] = merge(obj1[key], obj2[key])
        } else {
            merged[key] = obj1[key]
        }
        return merged
    }, { ...obj2 })
}

/**
 * merge di due array
 * @param {any[]} arr1 
 * @param {any[]} arr2 
 */
export function mergeArray(arr1, arr2) {
    const ret = []
    for (let i = 0; i < arr1.length && i < arr2.length; i++) {
        ret[i] = merge(arr1[i], arr2[i])
    }
    return ret.concat(arr1.length > arr2.length ? arr1.slice(arr2.length) : arr2.slice(arr1.length))
}