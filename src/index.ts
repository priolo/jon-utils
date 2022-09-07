import * as array from "./object/array"
import * as diff from "./object/diff"
import * as equal from "./object/equal"
import * as explore from "./object/explore"
import * as isType from "./object/isType"
import * as json from "./object/jsonHash"
import * as obj from "./object/obj"
const eq = { ...equal, ...isType} 

import * as time from "./time"
import * as func from "./func"

import { EventEmitter } from "./EventEmitter"
import { clipboard } from "./clipboard"
import { log, LOG_LEVEL, LOG_TYPE } from "./log"
import * as GeoPosition from "./GeoPosition"
import * as Validator from "./validator"


export {
	obj,
	array,
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
