import type Type from "../Type/Biome.js";

/**
 * @module Biome
 *
 */
export default JSON.parse(
	await (await import("@Function/Configuration.js")).default("biome.json"),
) satisfies Type;
