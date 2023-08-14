import type { Option as _Option } from "files-pipe/Target/Option/Index.js";
import type { Rome } from "./Rome.js";
export interface Option extends _Option {
    [key: string]: any;
    Rome?: boolean | Rome;
}
declare const _default: Option;
export default _default;
