import type Interface from "../Interface/Option.js";

/**
 * @module Option
 *
 */
export default (await import("@Function/Merge.js")).default(
	(await import("@playform/pipe/Target/Variable/Option.js")).default,
	{
		Biome: (await import("@Variable/Biome.js")).default,
		Action: {
			Failed: async (On) => `Error: Cannot format file ${On.Input}!`,
			Accomplished: async (On) =>
				`Formatted ${On.Input} in ${On.Output}.`,
			Fulfilled: async ({ File }) =>
				File > 0
					? `Successfully formatted a total of ${File} JavaScript and TypeScript ${
							File === 1 ? "file" : "files"
						}.`
					: false,
		},
	} satisfies Interface,
);
