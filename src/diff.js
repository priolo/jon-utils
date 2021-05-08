/* eslint eqeqeq: "off" */

// come trasformare arr1 in arr2
export function diffArray( arr1, arr2 ) {
    const ret = []
    
    for ( let i=0; i<arr1.length; i++ ) {
        const item1 = arr1[i]
        const index1in2 = arr2.indexOf(item1)

        if ( index1in2 == i ) continue

        if ( index1in2 == -1 ) {
            ret.push({ act: "delete", from: i})
        }
        
        if ( index1in2 != -1 ) {
            ret.push({ act: "move", from: i, to: index1in2})
        }

        if ( i < arr2.length) {
            const item2 = arr2[i]
            const index2in1 = arr1.indexOf(item2)
            if ( index2in1 == -1 ) {
                ret.push({ act: "insert", from: i, value: item2})
            }
        }
        
    }
    return ret
}

export function addArray (arr, delta) {

    const exec = ( item ) => {
        switch (item.act) {
            case "delete":
                arr[item.from] = undefined
            break
            case "move":
                const tmp = arr[item.to]
                arr[item.to] = arr[item.from]
                arr[item.from] = tmp
            break
            case "insert":
                arr[item.from] = item.value
            break
        }
    }

    for ( let i=0; i<delta.length; i++ ) {
        const item = delta[i]
        exec(item)
    }

    return arr.filter ( item => item != undefined )
}

/**
 * restituisce un oggetto che è la differenza 
 * GESTIRE gli oggetti: Date e altri oggetti "nativi"
 * GESTIRE BENE gli ARRAY
 * @param {object} obj1 
 * @param {object} obj2 
 */
export function diff(obj1, obj2) {

    // se sono primitive allora controlla se sono uguali e se lo sono restituisci null
    if (!isObject(obj1) || !isObject(obj2)) {
        return isEqual(obj1, obj2) ? diff.NO_DIFFERENCE_KEY : obj2;
    }

    // se sono entrambi array uso un diff specifico
    if (Array.isArray(obj1) && Array.isArray(obj1)) {
        return diffArray(obj1,obj2)
    }

    // se uno dei due è un array allora sono diversi!
    if (Array.isArray(obj1) || Array.isArray(obj1)) {
        return obj2
    }

    const ret = {};

    for (let key in obj1) {
        // se 2 ha la proprietà di 1 presa in esame
        if (obj2.hasOwnProperty(key)) {
            let res = diff(obj1[key], obj2[key]);

            // metti la proprietà solo se ci sono differenze
            if (res != diff.NO_DIFFERENCE_KEY ) {
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

    return Object.keys(ret).length==0 ? diff.NO_DIFFERENCE_KEY : ret;
}

diff.NO_DIFFERENCE_KEY = "__no-difference__"

/**
 * Aggiunge ad un json la differenza 
 * in maniera da ripristinare il valore precedente
 * @param {*} obj 
 * @param {*} delta 
 */
export function add(obj, delta) {

    if (!isObject(delta)) {
        return delta;
    }

    if ( Array.isArray(delta) ) {
        addArray( obj,delta )
    }

    let ret = {};

    for (let key in delta) {
        if (key == "_deleted") continue;
        ret[key] = add(obj[key], delta[key]);
    }

    if (!isObject(obj)) return ret;

    for (let key in obj) {
        if (Object.keys(delta).some(k => k == key)) continue;
        if (delta._deleted && delta._deleted.some(k => k == key)) continue;
        ret[key] = obj[key];
    }

    return ret;
}

