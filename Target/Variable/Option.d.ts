/**
 * @module Option
 *
 */
declare const _default: Omit<{} & {
    File: string;
    Action: Omit<{} & {
        Read: ({ Input: e }: {
            Input: any;
        }) => Promise<string>;
        Wrote: ({ Buffer: e }: {
            Buffer: any;
        }) => Promise<any>;
        Passed: (e: any) => Promise<any>;
        Failed: (On: any) => Promise<string>;
        Accomplished: (On: any) => Promise<string>;
        Fulfilled: ({ File }: {
            File: any;
        }) => Promise<string | false>;
        Changed: (e: any) => Promise<any>;
    }, "__proto__">;
    Biome: any;
    Cache: {
        Search: string;
        Folder: string;
    };
    Path: string;
    Logger: number;
    Exclude: boolean;
}, "__proto__">;
export default _default;
