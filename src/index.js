import * as util from "./ref"
import * as equal from "./equal"
import * as diff from "./diff"
import * as explore from "./explore"
import * as isType from "./isType"
import * as jsonHash from "./jsonHash"


import { log, LOG_LEVEL, LOG_TYPE } from "./log"
import { debounce, delay } from "./timer"



export default {
	...util,
	...equal,
	...diff,
	...explore,
	...isType,
	...jsonHash,
}

export {
	log, LOG_LEVEL, LOG_TYPE,
	debounce, delay,
}