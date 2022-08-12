import { diff, add } from "../diff";


test('diff null', async () => {
	const obj1 = { par1: "nullable" }
	const obj2 = { par1: null }
	const delta = diff(obj1, obj2)
	expect(delta).toEqual({ par1: null })
})

test('no diff object', async () => {
	const obj1 = {par: "pippo"}
	const obj2 = {par: "pippo"}
	const delta = diff(obj1, obj2)
	expect(delta).toBe(diff.NO_DIFFERENCE_KEY)
})

test('diff non object', async () => {
	const obj1 = "pippo"
	const obj2 = "pippo"
	const delta = diff(obj1, obj2)
	expect(delta).toBe(diff.NO_DIFFERENCE_KEY)
})

test('diff obj array', async () => {
	let obj1 = [1, 2, 3]
	let obj2 = { "prop": 1 }
	let delta = diff(obj1, obj2)
	expect(delta).toEqual({ "prop": 1 })

	obj1 = { "prop": 1 }
	obj2 = [1, 2, 3]
	delta = diff(obj1, obj2)
	expect(delta).toEqual([1, 2, 3])

	obj1 = { "prop": 1, "prop2" :2 }
	obj2 = { "prop": [1, 2, 3] }
	delta = diff(obj1, obj2)
	expect(delta).toEqual({ "prop": [1, 2, 3], _deleted: ["prop2"] })
})

test('diff obj', async () => {
	const delta = diff(obj1, obj2)
	const obj2Clone = add(obj1, delta)
	expect(obj2).toEqual(obj2Clone)
})

test('add', async () => {
	const objDelta = diff(obj1, obj2)
	const obj2Clone = add(obj1, objDelta)
	expect(obj2).toEqual(obj2Clone)
})


const obj1 = {
	par1: "invar",
	par2: {
		par2_1: "sub-invar",
		par2_2: "sub-delete"
	},
	arr: ["arr-invar", "move", "arr-invar2", "arr-delete"],
	par3: "delete"

}
const obj2 = {
	par1: "invar",
	par4: "ins",
	par2: {
		par2_1: "sub-invar",
		par2_3: "sub-ins"
	},
	arr: ["arr-invar", "arr-invar2", "move"],

}