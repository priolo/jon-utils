import fs from "fs"
import path from "path"



/**
 * Restituisce alcune informazioni utili della directory
 * @param dir la directory dalle quali estrarre le info
 * @returns le informazioni della directory
 */
export async function getDirInfo(dir: string): Promise<DirInfo> {
	const files = await fs.promises.readdir(dir)
	let size = 0
	let fileOld = null
	let deltaOld = 0
	let now = Date.now()
	for (const file of files) {
		const stat = await fs.promises.stat(path.join(dir, file))
		size += stat.size
		const delta = Math.abs(now - stat.birthtimeMs)
		if (delta > deltaOld) {
			deltaOld = delta
			fileOld = file
		}
	}
	return { size, fileOld }
}
/**
 * Informazioni di una "directory" tramite "getDirInfo"
 */
export type DirInfo = {
	/** dimensione totale della directory in bytes*/
	size: number,
	/** il file piu' vecchio della directory */
	fileOld: string,
}

/**
 * Crea una directory se questa non esiste
 * se esiste non fa nulla
 * @param path path assoluta della directory
 */
export async function createDirIfNotExist(path: string): Promise<void> {
	const exist = await getIfExists(path)
	if (exist) return
	fs.promises.mkdir(path, { recursive: true })
}

/**
 * Elimina una directory o un file se questo esiste altrimenti non fa nulla
 * @param pathItem la path della directory o del file
 * @param secure se true controlla che il file/dir non sia fuori dalla directory del processo
 */
export async function deleteIfExist(pathItem: string, secure: boolean = true): Promise<boolean> {
	if (secure && !isSubDir( process.cwd(), pathItem)) return false
	const exist = await getIfExists(pathItem)
	if (!exist) return false
	try {
		await fs.promises.rm(pathItem, { recursive: true, force: true })
		return true
	} catch (e) {
		return false
	}
}

/**
 * Restituisce true se il "parent" contiene "dir"
 * @param parent 
 * @param dir 
 */
export function isSubDir(parent, dir): boolean {
	const relative = path.relative(parent, dir)
	return relative && !relative.startsWith('..') && !path.isAbsolute(relative)
}

/**
 * Restituisce true se il file o dir esiste altrimenti false
 * @param path directory o file da verificare se esiste 
 */
export async function getIfExists(path: string): Promise<boolean> {
	try {
		await fs.promises.access(path, fs.constants.F_OK)
	} catch (err) {
		return false
	}
	return true
}