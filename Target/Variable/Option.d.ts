/**
 * @module Option
 *
 */
declare const _default: Omit<{} & {
    File: string;
    Biome: any;
    Cache: {
        Search: string;
        Folder: string;
    };
    Path: string;
    Logger: 2;
    Action: Omit<{} & {
        Read: ({ Input }: import("@playform/pipe/Target/Interface/File").default) => Promise<string>;
        Wrote: ({ Buffer }: import("@playform/pipe/Target/Interface/File").default) => Promise<import("@playform/pipe/Target/Type/Buffer").Type>;
        Passed: (On: import("@playform/pipe/Target/Interface/File").default) => Promise<true>;
        Failed: (On: any) => Promise<string>;
        Accomplished: (On: any) => Promise<string>;
        Fulfilled: ({ File }: {
            File: any;
        }) => Promise<string | false>;
        Changed: (Plan: import("@playform/pipe/Target/Interface/Plan").default) => Promise<import("@playform/pipe/Target/Interface/Plan").default>;
    }, "__proto__">;
    Exclude: false;
}, "__proto__">;
export default _default;
