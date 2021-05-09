import { addArray, diffArray } from "../diffArray"



// come trasformare arr1 in arr2
test('diff array', async () => {
	const arr1 = ["item-invar", "item-deleted", { par: 1 }, "item-moved"]
	const arr2 = ["item-invar", "item-insert", "item-moved", { par: 1 }]
	const delta = diffArray(arr1, arr2)
	//console.log(delta)
	const arr2Clone = addArray(arr1, delta)
	//console.log(arr2Clone)
	expect(arr2).toEqual(arr2Clone)
})

// come trasformare arr1 in arr2
test('diff array', async () => {
	const arr1 = ["arr-invar", "move", "arr-invar2", "arr-delete"]
	const arr2 = ["arr-invar", "arr-invar2", "move"]
	const delta = diffArray(arr1, arr2)
	//console.log(delta)
	const arr2Clone = addArray(arr1, delta)
	//console.log(arr2Clone)
	expect(arr2).toEqual(arr2Clone)
})


