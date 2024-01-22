/**
 * @module Biome
 *
 */
export default JSON.parse(
	await (await import("../Function/Configuration.js")).default("biome.json"),
) satisfies Type;

import type Type from "../Interface/Biome.js";
