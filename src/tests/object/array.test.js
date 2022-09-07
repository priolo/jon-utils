import { groupBy } from "../../object/array"


describe('array', () => {

	// come trasformare arr1 in arr2
	test('array groupby', async () => {
		const arr = [
			{ label: "primo", group: 1 },
			{ label: "secondo", group: 2 },
			{ label: "terzo", group: 1 },
			{ label: "quarto", group: 3 },
			{ label: "quinto", group: 2 },
			{ label: "sesto", group: 1 },
		]
		const group = groupBy(arr, (item1, item2) => item1.group == item2.group)
		expect(group).toEqual([
			[
				{ label: "primo", group: 1 },
				{ label: "terzo", group: 1 },
				{ label: "sesto", group: 1 },
			],
			[
				{ label: "secondo", group: 2 },
				{ label: "quinto", group: 2 },
			],
			[
				{ label: "quarto", group: 3 },
			],
		])
	})

	test('array groupby one item', async () => {
		const arr = [
			{ label: "primo", group: 1 }
		]
		const group = groupBy(arr, (item1, item2) => item1.group == item2.group)
		debugger
		expect(group).toEqual([[{ label: "primo", group: 1 }]])
	})

	test('array groupby zero item', async () => {
		const arr = []
		const group = groupBy(arr, (item1, item2) => item1.group == item2.group)
		expect(group).toEqual([])
	})

})