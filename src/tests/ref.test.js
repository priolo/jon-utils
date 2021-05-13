import { cloneDeep, clone, merge } from "../ref"


test('merge', async () => {
	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj2 = { par1: 1, par2: { par2_1: 21 }, par3: 3, arr: [3, 4, 5] }
	const obj3 = merge(obj1, obj2)
	expect(obj3).toEqual(
		{ par1: -1, par2: { par2_1: -21, par2_5: -25 }, par3: 3, arr: [0, 1, 2] }
	)
	let obj = merge({ name: "pippo" }, null)
	expect(obj).toEqual({ name: "pippo" })
	obj = merge(null, { name: "pippo" })
	expect(obj).toEqual({ name: "pippo" })
	obj = merge("pippo", "topolino")
	expect(obj).toBe(null)
	obj = merge(null, "pippo")
	expect(obj).toBe(null)
	obj = merge(null, null)
	expect(obj).toBe(null)
})

test('cloneDeep', async () => {
	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const objClone = cloneDeep(obj1)
	expect(obj1).toEqual(objClone)
})

test('clone', async () => {
	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const objClone = clone(obj1)
	expect(obj1.par2).toBe(objClone.par2)
})

test('merge', async () => {
	const obj1 = { par3: 3, par2: { par2_1: 21, par2_2: 22 }, arr: [3, 4] }
	const obj2 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj3 = merge(obj1, obj2)
	expect(obj3).toEqual({
		par1: -1,
		par2: { par2_1: 21, par2_2: 22, par2_5: -25 },
		par3: 3,
		arr: [3, 4]
	})
})
