
/**
 * Attraverso la "path stringa"  
 * restituisce il valore della proprietà di un oggetto
 * @param {string} path il percorso (tramite punto) per identificare la proprietà 
 * @param {object} root object di partenza
 * @param {any} def da usare in caso se non si riesca a prelevare il valore
 */
export function getValueWithPath(path, root, def) {
	try {
		let { parent, value } = getParentAndKey(path, root);
		if (typeof value === "function") return value.bind(parent);
		return value;
	} catch (e) {
		return def;
	}
};

/**
 * Assegna un valore tramite "path string" 
 * alla property di un oggetto 
 * @param {string} path la path delle sub-property
 * @param {object} root l'oggetto di partenza
 * @param {*} value il valore da assegnare
 */
export function setValueWithPath(path, root, value) {
	let { parent, key } = getParentAndKey(path, root, true);
	if (typeof (key) === "number") return parent.splice(key, 1, value);
	return parent[key] = value;
}

/**
 * Permette di ricavare i dati della proprietà di un oggetto
 * La funzione restituisce:
```
{
	parent: object, 	// è l'oggetto che contiene la proprietà che si cerca
	key: string, 		// il nome della proprietà
	value: any, 		// il valore cercato
}
```
 * @param {string} path la path delle sub-property
 * @param {*} root l'oggetto di partenza
 * @param {*} bCreate se true allora crea tutti gli oggetti necessari se non ci fossero
 */
export function getParentAndKey(path, root, bCreate) {
	let p = path.split(".");
	let current = root || window;
	let lastSubpath = "";
	let parent;

	for (let cont = 0; cont < p.length; cont++) {
		let subPath = p[cont];

		let indexQ = subPath.indexOf("[");
		if (indexQ != -1) {
			let index = Number(subPath.substring(indexQ + 1, subPath.length - 1));
			let name = subPath.substring(0, indexQ);
			parent = current[name];
			current = parent;
			subPath = index;
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
				throw new Error(`Il parametro: ${path}; non esiste`);
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
 * esempio:  
`{ par1: 1: par2: { par2_1: 21, par2_2: 22 }}`  
`{ par1: 1: par2: { par2_1: 21, par2_2: 22, par2_3: 23 }, par3: 3 }`  
== `true`  
Se ignoreNull == true  
`{ par1: 1: par2: { par2_1: 21, par2_2: 22 }}`  
`{ par1: 1, par2: null}`  
== `true`
 * @param {*} obj1 oggetto che come minimo si deve trovare in obj2
 * @param {*} obj2 oggetto che deve contenere un valore uguale a obj1
 * @param {*} ignoreNull se il parametro di obj1 è null allora viene ignorato
 * @returns {boolean} Se l'oggetto1 è dentro l'oggetto2 
 */
export function objectIsIn(obj1, obj2, ignoreNull = false) {
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

function _equalFunction(f1, f2) {
	if (typeof f1 != "function" || typeof f2 != "function") return false;
	let f1s = f1.toString();
	f1s = f1s.substring(f1s.indexOf("{"));
	let f2s = f2.toString();
	f2s = f2s.substring(f2s.indexOf("{"));
	return f1s == f2s;
}

function _equalDate(d1, d2) {
	if (!(d1 instanceof Date) || !(d2 instanceof Date)) return false;
	return d1.getTime() == d2.getTime();
}

/**
 * Permette di clonare solo una specifica path
 * @param {string} path
 * @param {object} obj
 */
export function clonePath(obj, path) {
	let objClone = { ...obj };
	let index = path.indexOf(".");
	if (index == -1) return objClone;
	let subprop = path.slice(0, index);
	if (objClone[subprop] == undefined) throw "Path non trovata";

	objClone[subprop] = clonePath(objClone[subprop], path.slice(index + 1));
	return objClone;
}



