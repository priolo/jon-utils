import { objectIsIn, minCommonProps, reduceObject, matchPath } from '../object'


describe('util object', () => {

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

		const clone = reduceObject( obj, {}, (obj, acc, origin, paths )=>{
			return true
		})
	
		expect(clone).toEqual(obj)
	})

	// it("matchPath", async () => {
	// 	const match = matchPath(
	// 		"param1.0.param2",
	// 		"param1.*.param2"
	// 	)
	// 	expect(match).toBeTruthy()
	// })

	//it("reduceObject:clone", async () => {
		// const obj = {
		// 	users: [
		// 		{ id:1, name: "ivano"},
		// 		{ id:2, name: "edoardo"},
		// 		{ id:3, name: "alfredo"},
		// 	]
		// }

		// const clone = reduceObject( obj, {}, (obj, acc, origin, paths )=>{
		// 	const fullPath = paths.join(".")

		// 	// if ( key == "param_1_1" ) {
		// 	// 	delete acc[key]
		// 	// }
		// 	console.log( fullPath )
		// 	//acc[key] = {}
		// 	//return acc
		// 	return true
		// })
	
		// expect(clone).toEqual(obj)
	//})
    
});


