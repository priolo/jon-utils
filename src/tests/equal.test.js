

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
