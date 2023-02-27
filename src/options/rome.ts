import type { Configuration } from "@rometools/wasm-nodejs";

export interface ROME extends Omit<Configuration, "$schema"> {
	[key: string]: unknown;
}

export default {} satisfies ROME;
