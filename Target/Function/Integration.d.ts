/**
 * @module Integration
 *
 */
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
    Cache: {
        Search: string;
        Folder: string;
    };
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
}, "__proto__">;
export declare const Merge: import("@playform/build/Target/Interface/Merge.js").default<import("@playform/build/Target/Interface/Merge.js").Generic>;
