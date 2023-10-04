/**
 * @module Rome
 *
 */
export default interface Type extends Omit<Configuration, "$schema"> {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}

import type { Configuration } from "@rometools/wasm-nodejs";
