/**
 * @module Biome
 *
 */
export default JSON.parse(
	await (await import("../Function/Config.js")).default("Biome.json")
) satisfies Type;

import type Type from "../Interface/Biome.js";
