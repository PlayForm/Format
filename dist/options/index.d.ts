import type { ROME } from "./rome.js";
import type { Options as OptionsBase } from "files-pipe/dist/options/index.js";
export interface Options extends OptionsBase {
    [key: string]: unknown;
    rome?: boolean | ROME;
}
declare const _default: Options;
export default _default;
