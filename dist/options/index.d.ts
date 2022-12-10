/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
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
        wrote: (_file: string, data: string) => Promise<string>;
        read: (file: import("fs").PathLike | import("fs/promises").FileHandle) => Promise<string>;
        passed: () => Promise<true>;
        failed: (inputPath: optionCallbacksFile["inputPath"]) => Promise<string>;
        accomplished: (inputPath: optionCallbacksFile["inputPath"], outputPath: optionCallbacksFile["outputPath"], _fileSizeBefore: optionCallbacksFile["fileSizeBefore"], _fileSizeAfter: optionCallbacksFile["fileSizeAfter"]) => Promise<string>;
        fulfilled: (pipe: optionCallbacksPipe) => Promise<string>;
        changed: (pipe: optionCallbacksPipe) => Promise<optionCallbacksPipe>;
    };
};
export default options;
