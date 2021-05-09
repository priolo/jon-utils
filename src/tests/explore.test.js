import { explore, exploreMap } from "../../explore"


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

	let res = explore( obj, "par2.par2_1")
	expect(res.parent[res.key]).toBe(-21)
	res = explore( obj, "par2.par2_2.id")
	expect(res[1].parent).toBe(obj.par2.par2_2[1])
	expect(res[0].key).toBe("id")
})

test('explore array', async () => {
	const obj1 = [
		[
			{ token: "111", name: "pippo" },
			{ token: "222", name: "pluto" },
			{ token: "333", name: "paperino" },
		]
	]
	const obj2 = {
		arr1: [
			{ param: [ 
				{id: "1", name: "uno"},
				{id: "2", name: "due"},
				{id: "3", name: "tre"},
			] },
			{ param: [ 
				{id: "4", name: "quattro"},
				{id: "5", name: "cinque"},
			] },
			{ param: [ 
				{id: "6", name: "sei"},
			] },
		]
	}


	let res = explore( obj1, "token").flat()
	expect(res[1].parent).toBe(obj1[0][1])
	expect(res[1].parent[res[1].key]).toBe("222")

	res = explore( obj2, "arr1.param.id").flat()
	expect(res[3].parent).toBe(obj2.arr1[1].param[0])

})

test('explore', async () => {
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
		]
	}

	exploreMap(obj1, "token", act => delete act.parent[act.key])
	expect(obj1[0][1]).toEqual({ name: "pluto" })

	exploreMap(obj2, "arr1.param.id", act => delete act.parent[act.key])
	expect(obj2.arr1[1].param[1]).toEqual({ name: "cinque" })

})
