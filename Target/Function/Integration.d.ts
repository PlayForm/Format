/**
 * @module Integration
 *
 */
declare const _default: Type;
export default _default;
import type Type from "../Interface/Integration.js";
export declare const Default: Omit<{} & {
    File: string;
    Biome: any;
    Cache: {
        Search: string;
        Folder: string;
    };
    Path: string;
    Logger: 2;
    Action: Omit<{} & {
        Failed: (On: import("@playform/file-pipe/Target/Interface/File.js").default) => Promise<string>;
        Accomplished: (On: import("@playform/file-pipe/Target/Interface/File.js").default) => Promise<string>;
        Fulfilled: ({ File }: import("@playform/file-pipe/Target/Interface/Plan.js").default) => Promise<string | false>;
        Read: ({ Input }: any) => Promise<string>;
        Wrote: ({ Buffer }: any) => Promise<any>;
        Passed: (On: any) => Promise<true>;
        Changed: (Plan: any) => Promise<any>;
    }, "__proto__">;
    Exclude: false;
}, "__proto__">;
export declare const Merge: import("typescript-esbuild/Target/Interface/Merge.js").default<import("typescript-esbuild/Target/Interface/Merge.js").Generic>;
