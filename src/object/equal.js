import { isObject } from "./isType";
/**
 * Fa un controllo "weak" tra due oggetti
 * @param v1 oggetto da confrontare
 * @param v2 oggetto da confrontare
 */
export function isEqual(v1, v2) {
    return Object.is(v1, v2);
}
/**
 * Fa un controllo "deep" tra due oggetti
 * @param v1 oggetto da confrontare
 * @param v2 oggetto da confrontare
 */
export function isEqualDeep(v1, v2) {
    if (!isObject(v1) || !isObject(v2)) {
        return isEqual(v1, v2);
    }
    for (let key in v1) {
        if (!isEqualDeep(v1[key], v2[key]))
            return false;
    }
    for (let key in v2) {
        if (!v1.hasOwnProperty(key))
            return false;
    }
    return true;
}
//# sourceMappingURL=equal.js.map