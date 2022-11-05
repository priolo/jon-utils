import { isEqualDeep } from "../../object/equal"


test('isEqualDeep', async () => {

	const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj2 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
	const obj3 = { par1: -1, par2: { par2_1: -21, par2_5: -26 }, arr: [0, 1, 2] }
	const obj4 = { par1: -1, par2: { par2_1: -21, par2_5: -26 }, arr: [0, 2, 1] }

	expect(isEqualDeep(obj1, obj2)).toBeTruthy()
	expect(isEqualDeep(obj1, obj3)).toBeFalsy()
	expect(isEqualDeep(obj3, obj4)).toBeFalsy()

	expect(isEqualDeep(obj1, "pippo")).toBeFalsy()
	expect(isEqualDeep("pippo", "pippo")).toBeTruthy()
	expect(isEqualDeep("pippo", 33)).toBeFalsy()

	expect(isEqualDeep(
		{ prop: undefined }, 
		{ prop: null }
	)).toBeFalsy()

	expect(isEqualDeep(
		{ prop: undefined }, 
		{ prop: null },
		{ ignoreUndefined: true }
	)).toBeTruthy()

})


