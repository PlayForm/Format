/**
 * @module Option
 *
 */
declare const _default: {
    Biome: any;
    Action: {
        Failed: (On: any) => Promise<string>;
        Accomplished: (On: any) => Promise<string>;
        Fulfilled: ({ File }: {
            File: any;
        }) => Promise<string | false>;
    };
};
export default _default;
