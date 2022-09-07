import { addArray, diffArray } from "../../object/diffArray"


describe('diffArray', () => {

	// come trasformare arr1 in arr2
	test('diff array primitive', async () => {
		const arr1 = ["item-invar", "item-deleted", { par: 1 }, "item-moved"]
		const arr2 = ["item-invar", "item-insert", "item-moved", { par: 1 }]
		const delta = diffArray(arr1, arr2)
		const arr2Clone = addArray(arr1, delta)
		expect(arr2).toEqual(arr2Clone)
	})

	test('diff array move primitive', async () => {
		const arr1 = ["arr-invar", "move", "arr-invar2", "arr-delete"]
		const arr2 = ["arr-invar", "arr-invar2", "move"]
		const delta = diffArray(arr1, arr2)
		const arr2Clone = addArray(arr1, delta)
		expect(arr2).toEqual(arr2Clone)
	})

	test('diff array objects', async () => {
		const arr1 = [
			{ id: 1, name: "pippo" },
			{ id: 2, name: "pluto" },
			{ id: 3, name: "paperino" },
		]
		const arr2 = [
			{ id: 1, name: "pippo" },
			{ id: 4, name: "pluto" },
			{ id: 5, name: "paperoga" },
			{ id: 3, name: "paperino" },
		]
		const delta = diffArray(arr1, arr2)
		const arr2Clone = addArray(arr1, delta)
		expect(arr2).toEqual(arr2Clone)
	})

})