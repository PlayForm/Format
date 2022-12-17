import type { Options as OptionsBase } from "files-pipeline/dist/options/index.js";
import type ROME from "./rome.js";
export type filterFn = (file: string) => boolean;
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
declare const _default: {
    files: string;
    pipeline: {
        failed: (current: import("files-pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        accomplished: (current: import("files-pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        fulfilled: (pipe: import("files-pipeline/dist/options/index.js").optionCallbacksPipe) => Promise<string | false>;
    };
};
export default _default;
