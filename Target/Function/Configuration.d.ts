/// <reference types="node" />
/**
 * @module Configuration
 *
 */
declare const _default: Interface;
export default _default;
import type Interface from "@Interface/Configuration.js";
export declare const readFile: typeof import("fs/promises").readFile;
export declare const resolve: (...paths: string[]) => string;
