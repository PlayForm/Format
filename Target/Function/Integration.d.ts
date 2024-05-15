/**
 * @module Integration
 *
 */
<<<<<<< HEAD
declare const _default: (Option: import("../Interface/Option.js").default) => {
    name: string;
    hooks: {
        "astro:build:done": ({ dir: Directory }: {
            pages: {
                pathname: string;
            }[];
            dir: URL;
            routes: import("astro").RouteData[];
            logger: import("astro").AstroIntegrationLogger;
            cacheManifest: boolean;
        }) => Promise<void>;
    };
};
export default _default;
export declare const Default: Omit<{} & {
    File: string;
=======
declare const _default: Interface;
export default _default;
import type Interface from "../Interface/Integration.js";
export declare const Default: Omit<{} & {
    File: string;
    Biome: any;
>>>>>>> 8690bcb200a459d4ebc616a154b77a64ea809ba2
    Cache: {
        Search: string;
        Folder: string;
    };
<<<<<<< HEAD
    Logger: number;
    Action: Omit<{} & {
        Accomplished: (On: any) => Promise<string>;
        Changed: (e: any) => Promise<any>;
        Failed: (On: any) => Promise<string>;
        Fulfilled: ({ File }: {
            File: any;
        }) => Promise<string | false>;
        Passed: (e: any) => Promise<any>;
        Read: ({ Input: e }: {
            Input: any;
        }) => Promise<string>;
        Wrote: ({ Buffer: e }: {
            Buffer: any;
        }) => Promise<any>;
    }, "__proto__">;
    Biome: any;
    Path: string;
    Exclude: boolean;
=======
    Path: string;
    Logger: 2;
    Action: Omit<{} & {
        Failed: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Accomplished: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Fulfilled: ({ File }: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<string | false>;
        Read: ({ Input }: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Wrote: ({ Buffer }: import("@playform/pipe/Target/Interface/File.js").default) => Promise<import("@playform/pipe/Target/Type/Buffer.js").Type>;
        Passed: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<true>;
        Changed: (Plan: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<import("@playform/pipe/Target/Interface/Plan.js").default>;
    }, "__proto__">;
    Exclude: false;
>>>>>>> 8690bcb200a459d4ebc616a154b77a64ea809ba2
}, "__proto__">;
export declare const Merge: import("@playform/build/Target/Interface/Merge.js").default<import("@playform/build/Target/Interface/Merge.js").Generic>;
