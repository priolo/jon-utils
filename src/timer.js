
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
export function delay ( millisec ) {
    return new Promise(res => setTimeout(res, millisec));
}

export function waitTimeout(timeout, callback) {
	return new Promise((resolve, reject) => {
		// Set up the timeout
		const timer = setTimeout(() => {
			reject(new Error(`Promise timed out after ${timeout} ms`));
		}, timeout);

		// Set up the real work
		callback(
			(value) => {
				clearTimeout(timer);
				resolve(value);
			},
			(error) => {
				clearTimeout(timer);
				reject(error);
			}
		);
	});
}
