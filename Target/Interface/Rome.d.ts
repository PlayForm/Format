/**
 * @module Rome
 *
 */
export default interface Type extends Omit<Configuration, "$schema"> {
    [key: string]: any;
}
import type { Configuration } from "@rometools/wasm-nodejs";
