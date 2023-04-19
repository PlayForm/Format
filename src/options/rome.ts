import type { Configuration } from "@rometools/wasm-nodejs";

export interface ROME extends Omit<Configuration, "$schema"> {
	[key: string]: any;
}

export default {} satisfies ROME;
