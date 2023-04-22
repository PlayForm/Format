import type { Configuration } from "@rometools/wasm-nodejs";
export interface ROME extends Omit<Configuration, "$schema"> {
    [key: string]: any;
}
declare const _default: {};
export default _default;
