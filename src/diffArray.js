import { isEqualDeep } from "./equal"


function find(arr, item, start, max = 6) {
    for (let i = 0; i < arr.length && i < max; i++) {
        const itemCur = arr[i]
        if (isEqualDeep(item, itemCur)) return i
    }
    return -1
}

/**
 * restituisce le "regole" per trasformare arr1 in arr2
 * queste regole comprendolo lo "spostamento"
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns 
 */
export function diffArray(a1, arr2) {
    const delta = []
    const arr1 = [...a1]
    let i = 0

    while (i < arr2.length) {
        let act = null

        // non ci sono piu' item in arr1
        if (i >= arr1.length) {
            const act = { type: "add", val: arr2[i] }
            delta.push(act)
            exeArray(act, arr1)
            i++
            continue
        }

        const item1 = arr1[i]
        const index1in2 = find(arr2, item1, i)

        // è uguale: vado al prossimo
        if (index1in2 == i) {
            i++
            continue

        // non c'e'...
        } else if (index1in2 == -1) {
            const item2 = arr2[i]
            // verifico che non sia da qualche altra parte in arr1
            const index2in1 = find(arr1, item2, i)
            // non c'e': lo sostituisco con l'item di arr2
            if (index2in1 == -1) {
                act = { type: "sub", from: i, val: item2 }
            // trovato: lo sposto nella posizione giusta
            } else {
                act = { type: "mov", from: index2in1, to: i }
            }
            i++
            delta.push(act)
            exeArray(act, arr1)

            // è in un altra posizione
        } else if (index1in2 != -1) {
            act = { type: "mov", from: i, to: index1in2 }
            delta.push(act)
            exeArray(act, arr1)
        }
    }
    if (arr2.length < arr1.length) {
        delta.push({ type: "len", val: arr2.length })
    }
    return delta
}

/**
 * Esegue un "action" su un array
 * @param {*} action 
 * @param {Array} arr 
 */
function exeArray(action, arr) {
    switch (action.type) {
        case "del":
            arr.splice(action.from, 1)
            break
        case "mov":
            const tmp = arr[action.to]
            arr[action.to] = arr[action.from]
            arr[action.from] = tmp
            break
        case "sub":
            arr[action.from] = action.val
            break
        case "ins":
            arr.splice(action.from, 0, action.val)
            break
        case "add":
            arr.push(action.val)
            break
        case "len":
            arr.length = action.val
            break
    }
}

/**
 * 
 * @param {Array} a 
 * @param {Array} delta 
 * @returns 
 */
export function addArray(a, delta) {
    const arr = [...a]
    delta.forEach(action => exeArray(action, arr))
    return arr
}
