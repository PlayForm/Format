import type { Options as _Options } from "files-pipe/Target/Option/Index.js";
import type { Rome } from "./Rome.js";
export interface Option extends _Options {
    [key: string]: any;
    Rome?: boolean | Rome;
}
declare const _default: Option;
export default _default;
