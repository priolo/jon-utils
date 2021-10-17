import { Validator } from "../index"


test("verify email", async () => {
	expect(
		Validator.verify("iorioivano@gmail.com", "email")
	).toBeTruthy()

	expect(
		Validator.verify("iorioivanogmail.com", "email")
	).toBeFalsy()

	expect(
		Validator.verify(null, "email")
	).toBeFalsy()

	expect(
		Validator.verify(null, "?email")
	).toBeTruthy()
})

test("verify string", async () => {
	expect(
		Validator.verify("123", "string:3")
	).toBeTruthy()

	expect(
		Validator.verify("1234", "string:3")
	).toBeFalsy()

	expect(
		Validator.verify("", "string:>0")
	).toBeFalsy()
})

test("verify array", async () => {

	expect(
		Validator.verify("", "array")
	).toBeFalsy()

	expect(
		Validator.verify(null, "?array")
	).toBeTruthy()

	expect(
		Validator.verify([], "array")
	).toBeTruthy()

	expect(
		Validator.verify([], "array:>0")
	).toBeFalsy()
})

test("verify int", async () => {

	expect(
		Validator.verify("", "int")
	).toBeFalsy()

	expect(
		Validator.verify(3.5, "int")
	).toBeFalsy()

	expect(
		Validator.verify(45, "int:<100")
	).toBeTruthy()

	expect(
		Validator.verify(undefined, "?int")
	).toBeTruthy()

})

test("verify object", async () => {
	
	const value = {
		pippo: "bbb",
		pluto: {
			name: "giggio",
			height: 23,
			length: 56,
			posts: ["primo", "secondo", "terzo"]
		},
		paperino: [1, 2, 3]
	}

	expect(Validator.verify(
		value,
		{ pippo: "string:>2", pluto: { name:"string", height: "int" }, paperino: "array" }
	)).toBeTruthy()

	expect(Validator.verify(
		value,
		{ pippo: "string:>2", pluto: { name:"string", height: "int", no:"string" } }
	)).toBeFalsy()

})
