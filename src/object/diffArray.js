import { isEqualDeep } from "./equal";
/**
 * confronta in "deep" l'oggetto "item" con gli elementi dell'array "arr" e restituisce l'indice se lo trova altrimenti -1
 * @param arr array da controllare
 * @param item item da confrontare
 * @param start da dove deve cominciare
 * @param max quanti confronti al massimo deve fare
 * @returns l'indice dell'item se lo trova oppure -1
 */
function find(arr, item, start = 0, max = 6) {
    for (let i = start; i < arr.length && i < max; i++) {
        const itemCur = arr[i];
        if (isEqualDeep(item, itemCur))
            return i;
    }
    return -1;
}
/**
 * restituisce le "regole" per trasformare arr1 in arr2
 * queste regole comprendolo lo "spostamento"
 * @param a1 array iniziale
 * @param arr2 array risultato
 * @returns un array di `Action` che permettono di "trasformare" `arr1` in `arr2`
 */
export function diffArray(a1, arr2) {
    const delta = [];
    const arr1 = [...a1];
    let i = 0;
    // ciclo arr2
    while (i < arr2.length) {
        let act = null;
        // in "arr1" gli "item" sono finiti: action => inserire i restati item di arr2
        if (i >= arr1.length) {
            const act = { type: "add", val: arr2[i] };
            delta.push(act);
            exeArray(act, arr1);
            i++;
            continue;
        }
        const item1 = arr1[i];
        const index1in2 = find(arr2, item1, i);
        // è uguale: vado al prossimo
        if (index1in2 == i) {
            i++;
            continue;
            // non c'e'...
        }
        else if (index1in2 == -1) {
            const item2 = arr2[i];
            // verifico che non sia da qualche altra parte in arr1
            const index2in1 = find(arr1, item2, i);
            // non c'e': lo sostituisco con l'item di arr2
            if (index2in1 == -1) {
                act = { type: "sub", from: i, val: item2 };
                // trovato: lo sposto nella posizione giusta
            }
            else {
                act = { type: "mov", from: index2in1, to: i };
            }
            i++;
            delta.push(act);
            exeArray(act, arr1);
            // è in un altra posizione
        }
        else if (index1in2 != -1) {
            act = { type: "mov", from: i, to: index1in2 };
            delta.push(act);
            exeArray(act, arr1);
        }
    }
    // se arr2 è piu' piccolo di arr1 allora tronco la lunghezza
    if (arr2.length < arr1.length) {
        delta.push({ type: "len", val: arr2.length });
    }
    // restituisco le `Action`
    return delta;
}
/**
 * Esegue un `Action` su un array
 * @param action azione da eseguire
 * @param arr array sulla quale applicare l'`Action`
 */
function exeArray(action, arr) {
    if (action.to == null)
        action.to = 0;
    if (action.from == null)
        action.from = 0;
    switch (action.type) {
        case "del":
            arr.splice(action.from, 1);
            break;
        case "mov":
            const tmp = arr[action.to];
            arr[action.to] = arr[action.from];
            arr[action.from] = tmp;
            break;
        case "sub":
            arr[action.from] = action.val;
            break;
        case "ins":
            arr.splice(action.from, 0, action.val);
            break;
        case "add":
            arr.push(action.val);
            break;
        case "len":
            arr.length = action.val;
            break;
    }
}
/**
 * aggiunge ad un array "a" le `Action` presenti nell'array "delta" e restituisce il risultato
 * tipicamente si usa per riconvertire un array in un altro grazie al risultato della funziona "diffArray"
 * @param a array da trasformare
 * @param delta array di `Action`
 * @returns l'array "a" con applicate le trasformazioni
 */
export function addArray(a, delta) {
    const arr = [...a];
    delta.forEach(action => exeArray(action, arr));
    return arr;
}
//# sourceMappingURL=diffArray.js.map