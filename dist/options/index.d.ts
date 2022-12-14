import type { Options as OptionsBase } from "@nikolarhristov/pipeline/dist/options/index.js";
import type ROME from "./rome.js";
export type filterFn = (file: string) => boolean;
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
declare const _default: {
    files: string;
    pipeline: {
        failed: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        accomplished: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        fulfilled: (pipe: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksPipe) => Promise<string | false>;
    };
};
export default _default;
