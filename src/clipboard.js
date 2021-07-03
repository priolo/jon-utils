

/**
 * Copia in clipboard un testo
 * @param {string} text da copiare nella clipboard
 */
 function clipboardSet(text) {
	const el = document.createElement('textarea');
	el.value = text;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

/**
 * Restituisce il testo contenuto nella clipboard
 */
async function clipboardGet() {
	return await navigator.clipboard.readText();
}

export const clipboard = {
	set: clipboardSet,
	get: clipboardGet,
}