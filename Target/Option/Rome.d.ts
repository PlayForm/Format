import type { Configuration } from "@rometools/wasm-nodejs";
export default interface Type extends Omit<Configuration, "$schema"> {
    [key: string]: any;
}
declare const _default: {};
export default _default;
