import type ROME from "./rome";
export declare type filterFunction = (file: string) => boolean;
export interface Options {
    [key: string]: any;
    path?: string;
    exclude?: string | RegExp | filterFunction | [string] | [RegExp] | [filterFunction];
    rome?: boolean | ROME;
    logger?: number;
}
declare const _default: () => Options;
export default _default;
