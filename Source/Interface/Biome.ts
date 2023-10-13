/**
 * @module Biome
 *
 */
export default interface Type extends Omit<Configuration, "$schema"> {
	// biome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}

// @TODO: Resolve proper type
// import type { Configuration } from "";
