import type { Options as OptionsBase } from "files-pipe/dist/options/Index.js";
import type { ROME } from "./ROME.js";
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
declare const _default: Options;
export default _default;
