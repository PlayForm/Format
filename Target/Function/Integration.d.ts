/**
 * @module Integration
 *
 */
declare const _default: Interface;
export default _default;
import type Interface from "../Interface/Integration.js";
export declare const Default: {
    File: string;
    Cache: {
        Search: string;
        Folder: string;
    };
    Path: string;
    Logger: 2;
    Action: {
        Failed: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Accomplished: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Fulfilled: ({ File }: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<string | false>;
        Read: ({ Input }: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Wrote: ({ Buffer }: import("@playform/pipe/Target/Interface/File.js").default) => Promise<import("@playform/pipe/Target/Type/Buffer.js").Type>;
        Passed: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<true>;
        Changed: (Plan: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<import("@playform/pipe/Target/Interface/Plan.js").default>;
    };
    Exclude: false;
    Biome: unknown;
};
export declare const Merge: <Ts extends readonly unknown[]>(...objects: Ts) => import("deepmerge-ts").DeepMergeHKT<Ts, Readonly<{
    DeepMergeRecordsURI: "DeepMergeRecordsDefaultURI";
    DeepMergeArraysURI: "DeepMergeArraysDefaultURI";
    DeepMergeSetsURI: "DeepMergeSetsDefaultURI";
    DeepMergeMapsURI: "DeepMergeMapsDefaultURI";
    DeepMergeOthersURI: "DeepMergeLeafURI";
    DeepMergeFilterValuesURI: "DeepMergeFilterValuesDefaultURI";
}>, Readonly<{
    key: PropertyKey;
    parents: ReadonlyArray<Readonly<Record<PropertyKey, unknown>>>;
}>>;
