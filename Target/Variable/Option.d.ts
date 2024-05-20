/**
 * @module Option
 *
 */
declare const _default: {
    Biome: any;
    Action: {
        Failed: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Accomplished: (On: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
        Fulfilled: ({ File }: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<string | false>;
    };
};
export default _default;
