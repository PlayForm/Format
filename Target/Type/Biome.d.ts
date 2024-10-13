import type { Configuration } from "@biomejs/js-api";

/**
 * @module Biome
 *
 */
export type Type = Omit<Configuration, "$schema">;
export type { Type as default };
