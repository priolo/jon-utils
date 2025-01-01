export * as array from "./object/array.js"
import * as diff from "./object/diff.js"
import * as equal from "./object/equal.js"
import * as explore from "./object/explore.js"
import * as isType from "./object/isType.js"
import * as json from "./object/jsonHash.js"
import * as obj from "./object/obj.js"
const eq = { ...equal, ...isType} 

import * as time from "./time.js"
import * as func from "./func.js"

import { EventEmitter } from "./EventEmitter.js"
import { clipboard } from "./clipboard.js"
import { log, LOG_LEVEL, LOG_TYPE } from "./log.js"
import * as GeoPosition from "./GeoPosition.js"
import * as Validator from "./validator.js"


export {
	obj,

	diff,
	explore,
	json,
	eq,

	time,
	func,

	EventEmitter,
	clipboard,
	log, LOG_LEVEL, LOG_TYPE,
	GeoPosition,
	Validator,
}
