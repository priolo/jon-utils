import { isObject, isObjectStrict } from "../isType"

test('isObject', async () => {
	expect(isObject("23")).toBeFalsy()
	expect(isObject(23)).toBeFalsy()
	expect(isObject(null)).toBeFalsy()
	expect(isObject([1, 2, 3])).toBeTruthy()
	expect(isObject({ name: "pippo" })).toBeTruthy()
})

test('isObjectStrict', async () => {
	expect(isObjectStrict([1,2,3])).toBeFalsy()
	expect(isObjectStrict({})).toBeTruthy()
})