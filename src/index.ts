export * as array from "./object/array.js"
export * as diff from "./object/diff.js"
export * as explore from "./object/explore.js"
export * as json from "./object/jsonHash.js"
export * as obj from "./object/obj.js"
export * as time from "./time.js"
export * as func from "./func.js"
export * as filesystem from "./fs/index.js"

export { EventEmitter } from "./EventEmitter.js"
export type { EventMessage } from "./EventEmitter.js"
export { clipboard } from "./clipboard.js"
export { log, LOG_LEVEL, LOG_TYPE } from "./log.js"
export * as GeoPosition from "./GeoPosition.js"
export * as Validator from "./validator.js"

import * as equal from "./object/equal.js"
import * as isType from "./object/isType.js"
const eq = { ...equal, ...isType }
export { eq }
