import type { Options as OptionsBase, optionCallbacksFile, optionCallbacksPipe } from "@nikolarhristov/pipeline/dist/options/index.js";
import type ROME from "./rome.js";
export type filterFn = (file: string) => boolean;
export interface Options extends OptionsBase {
    [key: string]: any;
    rome?: boolean | ROME;
}
export declare const options: {
    files: string;
    pipeline: {
        wrote: (current: optionCallbacksFile) => Promise<import("@nikolarhristov/pipeline/dist/options/index.js").optionBuffer>;
        read: (current: optionCallbacksFile) => Promise<string>;
        passed: () => Promise<true>;
        failed: (inputPath: optionCallbacksFile["inputPath"]) => Promise<string>;
        accomplished: (current: optionCallbacksFile) => Promise<string>;
        fulfilled: (pipe: optionCallbacksPipe) => Promise<string>;
        changed: (pipe: optionCallbacksPipe) => Promise<optionCallbacksPipe>;
    };
};
export default options;
