import type { ROME } from "./rome.js";
import type { Options as OptionsBase } from "files-pipeline/dist/options/index.js";
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
declare const _default: Options;
export default _default;
