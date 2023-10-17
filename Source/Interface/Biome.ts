/**
 * @module Biome
 *
 */
export default interface Type extends Omit<Configuration, "$schema"> {
	[key: string]: Value<Type>;
}

import type { Configuration } from "@biomejs/js-api";
import type Value from "typescript-esbuild/Target/Interface/Value.js";
