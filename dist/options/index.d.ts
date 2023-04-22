import type { Options as OptionsBase } from "files-pipe/dist/options/index.js";
import type { ROME } from "./rome.js";
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
declare const _default: Options;
export default _default;
