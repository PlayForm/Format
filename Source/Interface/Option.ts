/**
 * @module Option
 *
 */
export default interface Type extends Option {
	[key: string]: Value<Type> | Value<Option>;

	Biome?: boolean | Biome;
}

import type Value from "typescript-esbuild/Target/Interface/Value.js";
import type Biome from "./Biome.js";

import type Option from "files-pipe/Target/Interface/Option.js";
