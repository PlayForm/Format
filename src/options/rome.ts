import type { Configuration } from "@rometools/wasm-nodejs";

export default interface ROME extends Configuration {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}
