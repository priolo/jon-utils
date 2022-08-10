import {isObject, isObjectStrict} from "./isType";



/**
 * Attraverso la "path" restituisce il valore della proprietà di un oggetto
 * @param path il percorso (tramite punto) per identificare la proprietà 
 * @param root object di partenza
 * @param def da usare in caso se non si riesca a prelevare il valore
 */
export function getValueWithPath(path:string, root:any, def:any) {
	try {
		let { parent, value } = getParentAndKey(path, root);
		if (typeof value === "function") return value.bind(parent);
		return value;
	} catch (e) {
		return def;
	}
};

/**
 * Assegna un "value" tramite la "path" alla property di "root"  
 * @param path la path delle sub-property
 * @param root l'oggetto di partenza
 * @param value il valore da assegnare
 */
export function setValueWithPath(path:string, root:any, value:any) {
	let { parent, key } = getParentAndKey(path, root, true);
	if (typeof (key) === "number") return parent.splice(key, 1, value);
	return parent[key] = value;
}

/**
 * Il riferimento di una proprietà di un oggetto
 */
export interface PropertyRef {
	parent: any, 		// è l'oggetto che contiene la proprietà che si cerca
	key: string, 		// il nome della proprietà
	value: any, 		// il valore cercato
}

/**
 * Permette di ricavare i dati della proprietà di un oggetto
 * @param pathStr la path delle sub-property
 * @param root l'oggetto di partenza
 * @param bCreate se true allora crea tutti gli oggetti necessari se non ci fossero
 */
export function getParentAndKey(pathStr:string, root:any, bCreate:boolean = false ):PropertyRef {
	let paths = pathStr.split(".");
	let current = root || window;
	let lastSubpath = "";
	let parent;

	for (let cont = 0; cont < paths.length; cont++) {
		let subPath = paths[cont];

		let indexQ = subPath.indexOf("[");
		if (indexQ != -1) {
			let index = Number(subPath.substring(indexQ + 1, subPath.length - 1));
			let name = subPath.substring(0, indexQ);
			parent = current[name];
			current = parent;
			subPath = index.toString();
			lastSubpath = subPath;
		} else {
			parent = current;
			lastSubpath = subPath;
		}

		// se necessario e non c'e' creo la prop
		if (current[subPath] == undefined) {
			if (bCreate) {
				current[subPath] = {}
			} else {
				throw new Error(`Il parametro: ${pathStr}; non esiste`);
			}
		}

		// setto la prossima prop
		current = current[subPath];
	}
	return {
		parent: parent,
		key: lastSubpath,
		value: current,
	}
}


/**
 * Permette di verificare se un oggetto ha gli stessi parametri di un altro  
 * @param obj1 oggetto che come minimo si deve trovare in obj2
 * @param obj2 oggetto che deve contenere un valore uguale a obj1
 * @param ignoreNull se il parametro di obj1 è null allora viene ignorato
 * @returns Se l'oggetto1 è dentro l'oggetto2 
 */
export function objectIsIn(obj1:any, obj2:any, ignoreNull = false):boolean {
	if (ignoreNull && obj2 == null) return true;
	if (Object.is(obj1, obj2)) return true;
	if (_equalFunction(obj1, obj2)) return true;
	if (_equalDate(obj1, obj2)) return true;
	if (typeof obj1 == "object" && typeof obj2 == "object") {
		for (var p in obj1) {
			if (!obj2.hasOwnProperty(p)) return false;
			if (!objectIsIn(obj1[p], obj2[p], ignoreNull)) return false;
		}
		return true;
	}
	return false;
}
function _equalFunction(f1:any, f2:any): boolean {
	if (typeof f1 != "function" || typeof f2 != "function") return false;
	let f1s = f1.toString();
	f1s = f1s.substring(f1s.indexOf("{"));
	let f2s = f2.toString();
	f2s = f2s.substring(f2s.indexOf("{"));
	return f1s == f2s;
}
function _equalDate(d1:any, d2:any): boolean {
	if (!(d1 instanceof Date) || !(d2 instanceof Date)) return false;
	return d1.getTime() == d2.getTime();
}


/**
 * Permette di clonare solo una specifica path
 * @param obj Oggetto da cui prendere le proprietà
 * @param path path da clonare. Es.: "param1.param2"
 * @returns Oggetto con le proprietà clonate
 */
export function clonePath(obj:any, path:string):any {
	let objClone = { ...obj };
	let index = path.indexOf(".");
	if (index == -1) return objClone;
	let subprop = path.slice(0, index);
	if (objClone[subprop] == undefined) throw "Path non trovata";

	objClone[subprop] = clonePath(objClone[subprop], path.slice(index + 1));
	return objClone;
}


/**
 * Confronta un array di oggetti
 * e restituisce un oggetto che ha le proprietà comuni
 * - i params tutti uguali sono valorizzati
 * - i params diversi sono settati a null
 * @param objects un array di oggetti da confrontare
 * @returns un oggeto con tutte le proprietà comuni
 */
 export function minCommonProps(objects:any[]): any {
	return objects.reduce((objRef, obj) => {
		const keysRef = new Set(Object.keys(objRef));
		for ( const key in obj ) {
			if (!(key in objRef)) {
				objRef[key] = obj[key]
			} else if (objRef[key] !== obj[key]) {
				objRef[key] = null
			}
			keysRef.delete(key)
		}
		keysRef.forEach(key => objRef[key] = null)
		return objRef
	}, {})
}

/**
 * Fa un clone "deep" di un oggetto
 * @param obj oggetto da clonare
 */
 export function cloneDeep(obj:any):any {
    if (obj == undefined) return undefined;
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Fa un clone "weak" di un oggetto
 * @param obj oggetto da clonare
 */
export function clone(obj:any):any {
    return { ...obj };
}

/**
 * Deep merge from two object
 * @param obj1 oggetto 1 che ha la precedenza
 * @param obj2 oggetto 2 che copia le sue "props" se non ci so gia' nel primo oggetto
 * @param replaceNulls se true allora se il primo object ha una proprietà a null verrà eventualmente sostituita dal secondo oggetto
 */
export function merge(obj1:any, obj2:any, replaceNulls = true): any {
    if ( replaceNulls ) {
        if ( obj1==null && obj2!=null ) return obj2
        if ( obj1!=null && obj2==null ) return obj1
    }
    // se ci sono primitive, non sono confrontabili, manda la seconda
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
 * fa il merge, se necessario, dei proprio "item"
 * @param arr1 
 * @param arr2 
 */
export function mergeArray(arr1:any[], arr2:any[]) {
    const ret:any[] = []
    for (let i = 0; i < arr1.length && i < arr2.length; i++) {
        ret[i] = merge(arr1[i], arr2[i])
    }
    return ret.concat(arr1.length > arr2.length ? arr1.slice(arr2.length) : arr2.slice(arr1.length))
}

/**
 * @param source oggetto originale da copiare e trasformare
 * @param dest oggetto destinazione risultato della trasfromazione dell'oggetto `source`
 * @param root radice dell'oggetto `source`
 * @param paths array di path per arrivare dal `root` al valore di `source'. 
 * Di norma l'ultimo valore è: `source[paths[paths.length-1]]`
 */
export type CbReduceObject = (source:any, dest:any, root:any, paths:string[] ) => boolean

/**
 * Genera un oggetto "destinazione" (obj) da un oggetto "sorgente" (acc) 
 * ciclando in deep tutti i suoi parametri
 * La generazione passa per un callback (cb) che indica se mantenere o modificare una proprietà 
 * @param source "coorente" oggetto sorgente da copiare e trasformare
 * @param dest "corrente" oggetto destinazione risultato della trasfromazione
 * @param callback callback che indica come trasformare ogni proprietà della sorgente
 * @param paths (inserito in automatico) array di path per arrivare dal `root` al valore di `source'. 
 * @param root (inserito in automatico) radice dell'oggetto `source`
 * @returns 
 */
export function reduceObject( source:any, dest:any, callback?:CbReduceObject, paths:string[]=[], root?:any ): any {
	for ( const key in source ) {
		dest[key] = _getCloneValue ( source[key] )
		const allPaths = [...paths, key]
		const goDeep = callback ? callback( source, dest, root, allPaths ) : true
		if ( isObject(dest[key]) && goDeep ) {
			reduceObject( source[key], dest[key], callback, allPaths, source )
		}
	}
	return dest
}
function _getCloneValue ( value ) {
	if ( isObjectStrict(value) ) {
		return {}
	} else if ( Array.isArray(value)) {
		return []
	} else {
		return value
	}
}

/**
 * Confronta un stringa "path" di proprietà con un template e restituisce true se c'e' corrispondenza
 * @param path 
 * @param template 
 */
export function matchPath ( source:string, template:string ): number {
	const sPaths = source.split(".")
	const tPaths = template.split(".")
	return matchPathArray( sPaths, tPaths )
}
export function matchPathArray ( source:string[], template:string[], deep=0 ): number {
	if ( template.length == 0 ) return deep
	if ( source.length < template.length ) return -1
	
	const sPath = source[0]
	const tPath = template[0]
	deep++

	if ( tPath == sPath || tPath === "*" ) {
		return matchPathArray ( source.slice(1), template.slice(1), deep )
	}
	if ( tPath === "?" ) {
		for ( let tries=0; tries<source.length-template.length+1; tries++ ) {
			let res = matchPathArray ( source.slice(1+tries), template.slice(1), deep )
			if ( res != -1) return tries+res
		}
	}

	return -1
}
