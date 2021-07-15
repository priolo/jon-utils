
let timeoutIDs = {};


export function debounce(name, callback, delay) {
	if (delay == 0) {
		callback.apply(this, null);
	} else {
		let toId = timeoutIDs[name];
		if (toId != null) clearTimeout(toId);
		timeoutIDs[name] = setTimeout(() => {
			delete timeoutIDs[name];
			callback.apply(this, null);
		}, delay);
	}
}

/**
 * crea una pausa async
 */
export function delay(millisec) {
	return new Promise(res => setTimeout(res, millisec));
}

/** 
 * genera un exception se, per eseguire il "promise" 
 * passa piu' tempo di quello settato in "timeout"
 * */
export function waitTimeout(timeout, promise) {
	return new Promise((resolve, reject) => {

		const timer = setTimeout(() => {
			reject(new Error(`Promise timed out after ${timeout} ms`));
		}, timeout)

		promise.then(value => {
			clearTimeout(timer);
			resolve(value);
		}).catch(error => {
			clearTimeout(timer);
			reject(error);
		})
	})
}

/** Restituisce un "iterator" con le date comprese tra "start" ed "end" incrementate dello "step" */
export function* forDates(start, end, step) {
	const dateCount = new Date(start < end ? start : end)
	const dateEnd = new Date(start > end ? start : end)

	while (dateCount <= dateEnd) {
		yield dateCount.getTime()
		dateCount.setDate(dateCount.getDate() + step)
	}
}