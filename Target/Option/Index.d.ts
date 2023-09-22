import type { Type as Rome } from "./Rome.js";
import type { Option as _Option } from "files-pipe";
export interface Type extends _Option {
    [key: string]: any;
    Rome?: boolean | Rome;
}
declare const _default: Type;
export default _default;
