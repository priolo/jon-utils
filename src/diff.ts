/* eslint eqeqeq: "off" */

import { addArray, diffArray } from "./diffArray";
import { isEqual } from "./equal"
import { isObject } from "./isType"


diff.NO_DIFFERENCE_KEY = "__no-difference__"


/**
 * restituisce un oggetto che è la differenza. 
 * Questo oggetto restituito indica come passare da `obj1` a `obj2` 
 * > da fare:  
 * > GESTIRE gli oggetti: Date e altri oggetti "nativi"
 * > GESTIRE BENE gli ARRAY
 * @param obj1 oggetto di partenza
 * @param obj2 oggetto a cui si vuole arrivare applicando la differenza restituita con `obj1`
 */
export function diff(obj1:any, obj2:any): any {

    // se sono primitive allora controlla se sono uguali e se lo sono restituisci null
    if (!isObject(obj1) || !isObject(obj2)) {
        return isEqual(obj1, obj2) ? diff.NO_DIFFERENCE_KEY : obj2;
    }

    // se sono entrambi array uso un diff specifico
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return diffArray(obj1, obj2)
    }

    // se uno dei due è un array allora sono diversi!
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
        return obj2
    }

    const ret:any = {};

    for (let key in obj1) {
        // se 2 ha la proprietà di 1 presa in esame
        if (obj2.hasOwnProperty(key)) {
            let res = diff(obj1[key], obj2[key]);

            // metti la proprietà solo se ci sono differenze
            if (res != diff.NO_DIFFERENCE_KEY) {
                ret[key] = res;
            }

            // se non ce l'ha vuol dire che è stata cancellata
        } else {
            if (ret._deleted == null) ret._deleted = [];
            ret._deleted.push(key);
        }
    }

    // inserisci tutte le proprietà nuove
    for (let key in obj2) {
        if (obj1.hasOwnProperty(key)) continue;
        ret[key] = obj2[key];
    }

    // se non ci sono differenze restituisci il "token" apposito altrimenti il risultato
    return Object.keys(ret).length == 0 ? diff.NO_DIFFERENCE_KEY : ret;
}

/**
 * Aggiunge all'oggetto `obj` le proprietà dell'oggetto `delta` 
 * e crea quindi un nuovo oggetto.
 * Tipicamente per ripristinare un oggetto con le sua differenze della funzione `diff`
 * @param obj oggetto a cui applicare il `delta`
 * @param delta un oggetto che contiene le `diff` che verranno applicate
 */
export function add(obj:any, delta:any):any {

    if (!isObject(delta)) {
        return delta;
    }

    let ret = {};

    for (let key in delta) {
        if (key == "_deleted") continue
        if (Array.isArray(obj[key])) {
            ret[key] = addArray(obj[key], delta[key])
        } else {
            ret[key] = add(obj[key], delta[key])
        }
    }

    if (!isObject(obj)) return ret;

    for (let key in obj) {
        if (Object.keys(delta).some(k => k == key)) continue;
        if (delta._deleted && delta._deleted.some(k => k == key)) continue;
        ret[key] = obj[key];
    }

    return ret;
}

