import type { Configuration } from "@rometools/wasm-nodejs";
export interface Type extends Omit<Configuration, "$schema"> {
    [key: string]: any;
}
declare const _default: Type;
export default _default;
