import type { Options as OptionsBase } from "@nikolarhristov/pipeline/dist/options/index.js";
import type ROME from "./rome.js";
export type filterFn = (file: string) => boolean;
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
export declare const options: {
    files: string;
    pipeline: {
        wrote: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<import("@nikolarhristov/pipeline/dist/options/index.js").optionBuffer>;
        read: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        passed: () => Promise<true>;
        failed: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        accomplished: (current: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksFile) => Promise<string>;
        fulfilled: (pipe: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksPipe) => Promise<string | false>;
        changed: (pipe: import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksPipe) => Promise<import("@nikolarhristov/pipeline/dist/options/index.js").optionCallbacksPipe>;
    };
};
export default options;
