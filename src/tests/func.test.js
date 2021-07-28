import { memoize } from "../func";


test('memoize', async () => {
	const add = (n) => (n + 10);
	const memoizedAdd = memoize(add);
	expect(memoizedAdd(3)).toBe(13)
	expect(memoizedAdd(3)).toBe(13)
	expect(memoizedAdd(4)).toBe(14)
	expect(memoizedAdd(4)).toBe(14)
})
