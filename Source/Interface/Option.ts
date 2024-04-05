/**
 * @module Option
 *
 */
export default interface Interface extends Option {
	Biome?: boolean | Biome;
}

import type Biome from "@Type/Biome.js";

import type Option from "@playform/pipe/Target/Interface/Option.js";
