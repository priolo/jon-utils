import { cloneDeep, clone, merge, mergeArray } from "../ref"


test("merge array", async () => {
	let ret = mergeArray([1,2,3],[4,5,6,7])
	expect(ret).toEqual([1,2,3,7])
	ret = mergeArray([1,2,null,4],[null,5])
	expect(ret).toEqual([1,2,null,4])
})

test('merge simple', async () => {

	let obj1, obj2, obj
	obj1 = [1, { name: "pippo" }, 5]
	obj2 = [4, { id: 5 }, null, 5]
	obj = merge(obj1, obj2)
	expect(obj).toEqual(
		[1, { name: "pippo", id: 5 }, 5, 5]
	)

	obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	obj2 = { par1: 1, par2: { par2_1: 21 }, par3: 3, arr: [3, 4, 5] }
	obj = merge(obj1, obj2)
	expect(obj).toEqual(
		{ par1: -1, par2: { par2_1: -21, par2_5: -25 }, par3: 3, arr: [0, 1, 2] }
	)

	obj1 = { par3: 3, par2: { par2_1: 21, par2_2: 22 }, arr: [3, 4] }
	obj2 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	obj = merge(obj1, obj2)
	expect(obj).toEqual({
		par1: -1,
		par2: { par2_1: 21, par2_2: 22, par2_5: -25 },
		par3: 3,
		arr: [3, 4, 2]
	})

	obj = merge({ name: "pippo" }, null)
	expect(obj).toEqual({ name: "pippo" })

	obj = merge(null, { name: "pippo" })
	expect(obj).toEqual({ name: "pippo" })

	obj = merge("pippo", "topolino")
	expect(obj).toBe("pippo")

	obj = merge(null, "pippo")
	expect(obj).toBe("pippo")

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
