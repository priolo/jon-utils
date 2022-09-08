
type cazzo = {event:string, payload:any}
type CallBack = (cazzo) => void;

/**
 * Gestore generico per eventi per il browser.
 */
export class EventEmitter {

	/**
	 * Per mette di inizializzare degli eventi cosi' da poter utilizzare l'evento speciale "*"
	 * @param events 
	 */
	constructor(events:string[]) {
		if (Array.isArray(events) && events) {
			this.eventsCallbacks = events.reduce((acc, event) => {
				acc[event] = []
				return acc
			}, {})
		}
	}

	/**
	 * Una dictionary di eventi e i relativi listener
	 */
	eventsCallbacks:{[name:string]:CallBack[]} = {}

	/**
	 * Aggiunge un listener per un evento
	 * @param event evento da gestire
	 * @param callback funzione da eseguire
	 **/
	on(event:string|string[], callback:CallBack) {
		if (event == "*") event = Object.keys(this.eventsCallbacks)
		if (Array.isArray(event)) return event.forEach(key => this.on(key, callback))

		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) {
			callbacks = []
			this.eventsCallbacks[event] = callbacks
		}
		callbacks.push(callback)
	}

	/**
	 * Rimuove un listener per un evento specifico
	 * @param event 
	 * @param callback 
	 * @returns 
	 */
	off(event:string|string[], callback:CallBack) {
		if (event == "*") event = Object.keys(this.eventsCallbacks)
		if (Array.isArray(event)) return event.forEach(key => this.off(key, callback))

		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) return
		if (!callback) return this.eventsCallbacks[event] = []
		this.eventsCallbacks[event] = callbacks.filter(cb => cb != callback)
	}

	/**
	 * Elimina tutti i listener per un evento
	 * @param event 
	 */
	offAll(event:string) {
		delete this.eventsCallbacks[event]
	}

	/**
	 * Esegue un listener solo una volta
	 * @param event 
	 * @param callback 
	 */
	once(event:string, callback:CallBack) {
		this.on(event, e => {
			callback(e)
			this.off(event, callback)
		})
	}

	/**
	 * Permette di emettere un evento
	 * @param event 
	 * @param payload 
	 * @returns 
	 */
	emit(event:string, payload:any) {
		let callbacks = this.eventsCallbacks[event]
		if (!callbacks) return
		for (const callback of callbacks) {
			callback({event, payload})
		}
	}

}