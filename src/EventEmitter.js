
export class EventEmitter {

	constructor(events) {
		if (Array.isArray(events) && events) {
			this.eventsCallbacks = events.reduce((acc, event) => {
				acc[event] = []
				return acc
			}, {})
		}
	}


	eventsCallbacks = {}

	on(event, callback) {
		if (event == "*") event = Object.keys(this.eventsCallbacks)
		if (Array.isArray(event)) return event.forEach(key => this.on(key, callback))

		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) {
			callbacks = []
			this.eventsCallbacks[event] = callbacks
		}
		callbacks.push(callback)
	}

	off(event, callback) {
		if (event == "*") events = Object.keys(this.eventsCallbacks)
		if (Array.isArray(event)) return event.forEach(key => this.on(key, callback))

		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) return
		if (!callback) return this.eventsCallbacks[event] = []
		this.eventsCallbacks[event] = callbacks.filter(cb => cb != callback)
	}

	offAll(event) {
		delete this.eventsCallbacks[event]
	}

	once(event, callback) {
		this.on(event, e => {
			callback(e)
			this.off(event, callback)
		})
	}

	emit(event, payload) {
		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) return
		for (const callback of callbacks) {
			callback({event, payload})
		}
	}

}