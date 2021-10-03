import * as array from "./array"
import * as util from "./ref"
import * as equal from "./equal"
import * as diff from "./diff"
import * as explore from "./explore"
import * as isType from "./isType"
import * as jsonHash from "./jsonHash"
import * as obj from "./object"
import { EventEmitter } from "./EventEmitter"
import { clipboard } from "./clipboard"

import { log, LOG_LEVEL, LOG_TYPE } from "./log"



import * as GeoPosition from "./GeoPosition"
import * as Validator from "./validator"
import * as time from "./timer"
import * as func from "./func"



export default {
	...util,
	...equal,
	...diff,
	...explore,
	...isType,
	...jsonHash,
}

export {
	obj,
	log, LOG_LEVEL, LOG_TYPE,

	EventEmitter,
	clipboard,
	GeoPosition,
	Validator,
	time,
	func,
	array,
}