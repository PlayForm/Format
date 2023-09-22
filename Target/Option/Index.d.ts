import type { Option as _Option } from "files-pipe";
import type { Type } from "./Rome.js";
export interface Type extends _Option {
    [key: string]: any;
    Rome?: boolean | Type;
}
declare const _default: Type;
export default _default;
