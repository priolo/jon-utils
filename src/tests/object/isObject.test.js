import { isObject, isObjectStrict, isUrl, isUrlImage }  from "../../object/isType"


describe('isObject', () => {

	test('isObject', async () => {
		expect(isObject("23")).toBeFalsy()
		expect(isObject(23)).toBeFalsy()
		expect(isObject(null)).toBeFalsy()
		expect(isObject([1, 2, 3])).toBeTruthy()
		expect(isObject({ name: "pippo" })).toBeTruthy()
	})

	test('isObjectStrict', async () => {
		expect(isObjectStrict([1, 2, 3])).toBeFalsy()
		expect(isObjectStrict({})).toBeTruthy()
	})

	test('isUrl', async () => {
		expect(
			isUrl("www.google.com")
		).toBeFalsy()
		expect(
			isUrl("http://:")
		).toBeFalsy()
		expect(
			isUrl("https://ciccio")
		).toBeTruthy()
		expect(
			isUrl("javascript:console.log(3)")
		).toBeFalsy()
	})

	test('isUrlImage', async () => {
		expect(
			isUrlImage("www.google.com")
		).toBeFalsy()
		expect(
			isUrlImage("http://pippo.com")
		).toBeFalsy()
		expect(
			isUrlImage("https://ciccio.jpg")
		).toBeFalsy()
		expect(
			isUrlImage("https://ciccio.com/pappo.jpg")
		).toBeTruthy()
		expect(
			isUrlImage("https://localhost/pappo.jpg")
		).toBeTruthy()
		expect(
			isUrlImage("https://127.0.0.1/pappo.jpg")
		).toBeTruthy()
	})

})