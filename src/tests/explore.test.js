import { explore, exploreMap, include, includeMap } from "../explore"
import { cloneDeep } from "../ref"


test('explore simple', async () => {
	const obj = {
		par1: -1,
		par2: {
			par2_1: -21,
			par2_2: [
				{ id: 1, name: "pippo" },
				{ id: 2, name: "pluto" },
				{ id: 3, name: "paperino" },
			]
		},
		arr: [0, 1, 2]
	}

	let res = explore(obj, "par2.par2_1")
	expect(res.parent[res.key]).toBe(-21)
	res = explore(obj, "par2.par2_2.id")
	expect(res[1].parent).toBe(obj.par2.par2_2[1])
	expect(res[0].key).toBe("id")
})

test('explore array', async () => {

	let res = explore(obj1, "token").flat()
	expect(res[1].parent).toBe(obj1[0][1])
	expect(res[1].parent[res[1].key]).toBe("222")

	res = explore(obj2, "arr1.param.id").flat()
	expect(res[3].parent).toBe(obj2.arr1[1].param[0])

	res = explore({ arr: [1, 2, 3] }, "arr")
	expect(res.parent[res.key]).toEqual([1, 2, 3])

})

// se non c'e' la path specificata non fare nulla
test('no path', async () => {
	const cloneObj1 = cloneDeep(obj1)

	exploreMap(cloneObj1, "not_exist").forEach(act => delete act.parent[act.key])
	expect(cloneObj1).toEqual(obj1)
})

test('exclude map', async () => {
	const cloneObj1 = cloneDeep(obj1)
	const cloneObj2 = cloneDeep(obj2)

	exploreMap(cloneObj1, "token").forEach(act => delete act.parent[act.key])
	expect(cloneObj1[0][1]).toEqual({ name: "pluto" })

	exploreMap(cloneObj2, "arr1.param.id").forEach(act => delete act.parent[act.key])
	expect(cloneObj2.arr1[1].param[1]).toEqual({ name: "cinque" })

})

// costruisco un oggetto partendo dai soli dati delle paths
test("include map", async () => {
	//const ret = include(obj2, "arr1.param.id")

	const ret = includeMap(obj2, [
		"undefined",
		null,
		"arr1.param.id",
		"arr1.param.name",
		"par2.par2_1",
		
	])


	console.log(JSON.stringify(ret, null, 2))
})



const obj1 = [
	[
		{ token: "111", name: "pippo" },
		{ token: "222", name: "pluto" },
		{ token: "333", name: "paperino" },
	]
]
const obj2 = {
	arr1: [
		{
			param: [
				{ id: "1", name: "uno" },
				{ id: "2", name: "due" },
				{ id: "3", name: "tre" },
			]
		},
		{
			param: [
				{ id: "4", name: "quattro" },
				{ id: "5", name: "cinque" },
			]
		},
		{
			param: [
				{ id: "6", name: "sei" },
			]
		},
	],
	par2: {
		arr2: [1, 2, 3],
		par2_1: { name: "pippo" }
	}
}