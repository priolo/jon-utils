import { hashCode, jsonStream } from "../../object/jsonHash"

const obj1 = jsonStream({
	par1: {
		par1_1: "item.1.1",
		par1_2: 1.2,
	},
	par2: "item.2",
	par3: [{ name: "ivano" }, { value: 3 }],
	par4: {
		par3_1: "item.4.1",
		par3_2: [1, 3, 2]
	}
})
const obj2 = jsonStream({
	par4: {
		par3_2: [1, 3, 2],
		par3_1: "item.4.1",
	},
	par1: {
		par1_1: "item.1.1",
		par1_2: 1.2,
	},
	par3: [{ name: "ivano" }, { value: 3 }],
	par2: "item.2",
})


describe('json hash', () => {

	test("hashCode", async () => {
		const str1 = hashCode("pippo")
		const str2 = hashCode("pippo")
		const str3 = hashCode("pippi")

		expect(str1).toBe(str2)
		expect(str1).not.toBe(str3)
	})

	test("jsonStream", async () => {
		const stream1 = jsonStream(obj1)
		const stream2 = jsonStream(obj2)
		expect(stream1).toBe(stream2)
	})

	test("hash json", async () => {
		const hash1 = hashCode(jsonStream(obj1))
		const hash2 = hashCode(jsonStream(obj2))
		expect(hash1).toBe(hash2)
	})

})