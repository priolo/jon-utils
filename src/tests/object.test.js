import { objectIsIn, minCommonProps, reduceObject, matchPath, getParentAndKey, PropertyRef, mergeArray, merge, cloneDeep, clone, matchPathArray } from '../object'


const objTest = { 
	par1: 1, 
	par2: { 
		par2_1: 21, 
		par2_2: [
			1, 
			{ par2_2_3: "pippo" },
			2,
			3 
		], 
		par2_3: 23 
	}, 
}

describe('util object', () => {


	it('getParentAndKey base', async () => {
		const propertyRef = getParentAndKey("par2.par2_3", objTest)
        expect(propertyRef).toEqual<PropertyRef>({
			key: "par2_3",
			parent: objTest.par2,
			value: 23
		});
    })

	it('getParentAndKey array', async () => {
		const propertyRef = getParentAndKey("par2.par2_2[0]", objTest)
        expect(propertyRef).toEqual<PropertyRef>({
			key: "0",
			parent: objTest.par2.par2_2,
			value: 1
		});
    })

	it('getParentAndKey array2', async () => {
		const propertyRef = getParentAndKey("par2.par2_2[1].par2_2_3", objTest)
        expect(propertyRef).toEqual<PropertyRef>({
			key: "par2_2_3",
			parent: objTest.par2.par2_2[1],
			value: "pippo"
		});
    })

	it('objectIsIn base', async () => {
        let obj1 = { par1: 1, par2: { par2_1: 21, par2_2: 22 }};
        let obj2 = { par1: 1, par2: { par2_1: 21, par2_2: 22, par2_3: 23 }, par3: 3 };
        expect(objectIsIn(obj1,obj2)).toBe(true);

        let obj3 = { par1: 99, par2: { par2_1: 21, par2_2: 22 }};
        expect(objectIsIn(obj1,obj3)).toBe(false);
    })

	it('objectIsIn ignoreNull', async () => {
        let obj1 = { par1: 1, par2: { par2_1: 21, par2_2: 22 }};
        let obj2 = { par1: null, par2: { par2_1: 21, par2_2: 22, par2_3: 23 }, par3: 3 };
        expect(objectIsIn(obj1,obj2,true)).toBe(true);
    })

    it('minCommonProps', async () => {
        const selected = [
            {primo: "1", secondo: "2", terzo: "3"},
            {primo: "5", secondo: "2", terzo: "3"},
            {secondo: "2"},
            {secondo: "2", terzo: "3", quarto: "4"},
            {primo: "1", secondo: "2", terzo: "3"}
        ]
        const result = minCommonProps(selected)

        expect(result).toEqual({primo: null, secondo: "2", terzo: null, quarto: null})

    })

	it("reduceObject:clone", async () => {
		const obj = {
			param_1: {
				param_1_1: {
					param_1_1_1: "pippo"
				},
				param_1_2: 45,
				param_1_3: [ 
					"topolino", 
					{ 
						param_1_3_1: "minnie", 
						param_1_3_2: [1,2,3] 
					} 
				]
			},
			param_2: {
				param_2_1: "paperino",
				param_2_2: [4,5,6]
			},
			param_3: "pluto"
		}

		let clone = reduceObject( obj, {}, ()=>true )
		expect(clone).toEqual(obj)

		clone = reduceObject( objTest, {}, ()=>true )
		expect(clone).toEqual(objTest)
	})
		
	it("merge array", async () => {
		let ret = mergeArray([1,2,3],[4,5,6,7])
		expect(ret).toEqual([1,2,3,7])
		ret = mergeArray([1,2,null,4],[null,5])
		expect(ret).toEqual([1,2,null,4])
	})

	it('merge simple', async () => {

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

	it('cloneDeep', async () => {
		const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
		const objClone = cloneDeep(obj1)
		expect(obj1).toEqual(objClone)
	})

	it('clone', async () => {
		const obj1 = { par1: -1, par2: { par2_1: -21, par2_5: -25 }, arr: [0, 1, 2] }
		const objClone = clone(obj1)
		expect(obj1.par2).toBe(objClone.par2)
	})

	it("matchPath", async () => {
		let index;

		index = matchPath(
			"p1.p2.p3",
			"p1.*.p3"
		)
		expect(index).toBe(3)

		index = matchPath(
			"p1.p2.p3.p4",
			"p1.*.*.p4"
		)
		expect(index).toBe(4)
	})

	it("matchPath", async () => {
		let index;

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"?.p3"
		)
		expect(index).toBe(3)

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.?.p4"
		)
		expect(index).toBe(4)

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.?.*.p4"
		)
		expect(index).toBe(4)
	})

	it("matchPath", async () => {
		let index;

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"?.p1"
		)
		expect(index).toBe(-1)

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.?.p1"
		)
		expect(index).toBe(-1)

		const match = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.?.*.p2"
		)
		expect(match).toBe(-1)
	})

	it("matchPath2", async () => {
		let index;

		index = matchPath(
			"p1.p2",
			"p1"
		)
		expect(index).toBe(1)

		index = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.?.p3"
		)
		expect(index).toBe(3)

		const match = matchPath(
			"p1.p2.p3.p4.p5",
			"p1.*"
		)
		expect(match).toBe(2)
	})

	it("reduceObject:clone", async () => {
		const obj = {
			users: [
				{ id:1, name: "ivano"},
				{ id:2, name: "edoardo"},
				{ id:3, name: "alfredo"},
			]
		}

		const clone = reduceObject( obj, {}, (obj, acc, origin, paths )=>{
			return true
		})
	
		expect(clone).toEqual(obj)
	})


	it("reduceObject:ignore", async () => {
		const obj = {
			users: [
				{ id:1, name: "ivano"},
				{ id:2, name: "edoardo"},
				{ id:3, name: "alfredo"},
			]
		}

		const template = "users.*.id"
		const pathsTemplate = template.split(".")
		const clone = reduceObject( obj, {}, (obj, acc, origin, paths )=>{
			const match = matchPathArray(paths, pathsTemplate)
			if ( match==paths.length) {
			 	delete acc[paths[match-1]]
				return false
			}
			return true
		})
	
		expect(clone).toEqual({
			users: [
				{ name: "ivano"},
				{ name: "edoardo"},
				{ name: "alfredo"},
			]
		})
	})

	it("reduceObject:consider", async () => {
		const obj = {
			users: [
				{ id:1, name: "ivano"},
				{ id:2, name: "edoardo"},
				{ id:3, name: "alfredo"},
			]
		}

		const template = "users.*.name"
		const pathsTemplate = template.split(".")
		const clone = reduceObject( obj, {}, (source, dest, origin, paths )=>{
			const match = matchPathArray(paths, pathsTemplate.slice(0,paths.length))
			if ( match!=paths.length) {
				delete dest[paths[paths.length-1]]
				return false
			}
			return true
		})
	
		expect(clone).toEqual({
			users: [
				{ name: "ivano"},
				{ name: "edoardo"},
				{ name: "alfredo"},
			]
		})
	})

});


