import type { Configuration } from "@rometools/wasm-nodejs";

export interface Type extends Omit<Configuration, "$schema"> {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}

export default {} satisfies Type as Type;
