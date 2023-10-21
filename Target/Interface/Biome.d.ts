/**
 * @module Biome
 *
 */
export default interface Type extends Omit<Configuration, "$schema"> {
    [key: string]: any;
}
import type { Configuration } from "@biomejs/js-api";
