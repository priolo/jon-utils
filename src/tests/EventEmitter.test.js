import { EventEmitter } from "../EventEmitter"

test('EventEmitter', async () => {

	const results = []
	const emitter = new EventEmitter()

	const callback1 = event => {
		results.push(`${event.payload.value} from callback1`)
	}
	const callback2 = event => {
		results.push(`${event.payload.value} from callback2`)
	}
	emitter.on("event1", callback1)
	emitter.on("event1", callback2)
	emitter.on("event2", event => {
		results.push(event.payload.value)
	})

	emitter.emit("event1", { value: "emit:event1" })
	emitter.emit("event2", { value: "emit:event2" })

	emitter.off("event1", callback1)
	emitter.emit("event1", { value: "emit:event1" })
	emitter.off("event1")
	emitter.emit("event1", { value: "emit:event1" })

	expect(results).toEqual([
		"emit:event1 from callback1",
		"emit:event1 from callback2",
		"emit:event2",
		"emit:event1 from callback2",
	])

})
