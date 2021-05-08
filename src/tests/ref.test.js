import {
	merge, isObject, isEqualDeep,
	cloneDeep, clone
} from "../ref";


test('merge', async () => {
	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj2 = { par1: 1, par2: { par2_1: 21 }, par3: 3, arr: [3, 4, 5] }
	const obj3 = merge(obj1, obj2)
	expect(obj3).toEqual(
		{ par1: -1, par2: { par2_1: -21, par2_5: -25 }, par3: 3, arr: [0, 1, 2] }
	)
})

test('isObject', async () => {
	expect(isObject("23")).toBeFalsy()
	expect(isObject(23)).toBeFalsy()
	expect(isObject(null)).toBeFalsy()
	expect(isObject([1, 2, 3])).toBeTruthy()
	expect(isObject({ name: "pippo" })).toBeTruthy()
})

test('isEqualDeep', async () => {
	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj2 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj3 = { par1: -1, par2: { par2_1: -21, par2_5: -26 }, arr: [0, 1, 2] }

	expect(isEqualDeep(obj1, obj2)).toBeTruthy()
	expect(isEqualDeep(obj1, obj3)).toBeFalsy()
	expect(isEqualDeep(obj1, "pippo")).toBeFalsy()
	expect(isEqualDeep("pippo", "pippo")).toBeTruthy()
	expect(isEqualDeep("pippo", 33)).toBeFalsy()
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

