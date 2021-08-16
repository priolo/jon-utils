import { objectIsIn, minCommonProps } from '../object'


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
    
});