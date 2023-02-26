import type { Configuration } from "@rometools/wasm-nodejs";

export interface ROME extends Omit<Configuration, "$schema"> {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}

export default {} satisfies ROME;
