import { time } from "../index"


test("waitTimeout", async () => {
	async function Test () {
		await time.delay(200)
		return "ok!"
	}

	let error = false
	let result = null
	try {
		result = await time.waitTimeout ( 100, Test )
	} catch ( e ) {
		error = true
	}
	expect(error).toBeTruthy()
	expect(result).toBe(null)

	error = false
	result = null
	try {
		result = await time.waitTimeout ( 30000, Test() )
	} catch ( e ) {
		error = true
	}
	expect(error).toBeFalsy()
	expect(result).toBe("ok!")
})

test("forDates", ()=>{
	const range = [...time.forDates("2021-04-12", "2021-05-23", 5)]
	expect(range).toEqual([1618185600000, 1618617600000, 1619049600000, 1619481600000, 1619913600000, 1620345600000, 1620777600000, 1621209600000, 1621641600000])
}) 