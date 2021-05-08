import {
	merge, isObject, isEqualDeep,
	cloneDeep, clone, diff,
	add, diffArray, addArray,
} from "../ref";



// test('diff', async () => {
// 	const obj1 = {
// 		par1: "invar",
// 		par2: {
// 			par2_1: "sub-invar",
// 			par2_2: "sub-delete"
// 		},
// 		arr: ["arr-invar", "move", "arr-invar2", "arr-delete"],
// 		par3: "delete"

// 	}
// 	const obj2 = {
// 		par1: "invar",
// 		par4: "ins",
// 		par2: {
// 			par2_1: "sub-invar",
// 			par2_3: "sub-ins"
// 		},
// 		arr: ["arr-invar", "arr-invar2", "move"],

// 	}
// 	const deltaPre = {
// 		_deleted: [	"par3" ],
// 		par2: {
// 			_deleted: [	"par2_2" ],
// 			par2_3: "sub-ins"
// 		},
// 		par4: "ins",
// 		arr: { '1': 'arr-invar2', '2': 'move', _deleted: [ '3' ] },
// 	}
// 	const delta = diff(obj1, obj2)

// 	console.log(delta)
// 	expect(deltaPre).toEqual(delta)
// })




// test('diff null', async () => {
// 	const obj1 = {
// 		par1: "nullable"
// 	}
// 	const obj2 = {
// 		par1: null
// 	}
// 	const deltaPre = {
// 		par1: null
// 	}
// 	const delta = diff(obj1, obj2)
// 	expect(deltaPre).toEqual(delta)
// })

// test('no diff object', async () => {
// 	const obj1 = {par: "pippo"}
// 	const obj2 = {par: "pippo"}
// 	const delta = diff(obj1, obj2)
// 	expect(delta).toBe(diff.NO_DIFFERENCE_KEY)
// })

// test('diff non object', async () => {
// 	const obj1 = "pippo"
// 	const obj2 = "pippo"
// 	const delta = diff(obj1, obj2)
// 	expect(delta).toBe(diff.NO_DIFFERENCE_KEY)
// })

// test('diff obj array', async () => {
// 	let obj1 = [1, 2, 3]
// 	let obj2 = { "prop": 1 }
// 	let delta = diff(obj1, obj2)
// 	expect(delta).toEqual({ "prop": 1 })

// 	let obj1 = { "prop": 1 }
// 	let obj2 = [1, 2, 3]
// 	let delta = diff(obj1, obj2)
// 	expect(delta).toEqual([1, 2, 3])

// 	let obj1 = { "prop": 1, "prop2" :2 }
// 	let obj2 = { "prop": [1, 2, 3] }
// 	let delta = diff(obj1, obj2)
// 	expect(delta).toEqual({ "prop": [1, 2, 3], _deleted: ["prop2"] })
// })



// come trasformare arr1 in arr2
test('diff array', async () => {
	const arr1 = ["item-invar", "item-deleted", { par: 1 }, "item-moved"]
	const arr2 = ["item-invar", "item-insert", "item-moved", { par: 1 }]

	const delta = diffArray(arr1, arr2)
	console.log(delta)
	console.log(arr2)
	const arr2Clone = addArray(arr1, delta)
	console.log(arr2Clone)
})



// test('add', async () => {
// 	const obj1 = {
// 		par1: "invar",
// 		par2: {
// 			par2_1: "sub-invar",
// 			par2_2: "sub-delete"
// 		},
// 		arr: ["arr-invar", "move", "arr-invar2", "arr-delete"],
// 		par3: "delete"

// 	}
// 	const obj2 = {
// 		par1: "invar",
// 		par4: "ins",
// 		par2: {
// 			par2_1: "sub-invar",
// 			par2_3: "sub-ins"
// 		},
// 		arr: ["arr-invar", "arr-invar2", "move"],
// 	}
// 	const objDelta = diff(obj1, obj2)
// 	const obj2Clone = add(obj1, objDelta)
// 	expect(obj2).toEqual(obj2Clone)
// })