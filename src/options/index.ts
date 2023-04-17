import deepmerge from "files-pipe/dist/lib/deepmerge.js";
import defaults from "files-pipe/dist/options/index.js";
import type { ROME } from "./rome.js";
import type { Options as OptionsBase } from "files-pipe/dist/options/index.js";

export interface Options extends OptionsBase {
	[key: string]: unknown;

	rome?: boolean | ROME;
}

export default deepmerge(defaults, {
	pipe: {
		failed: async (ongoing) =>
			`Error: Cannot format file ${ongoing.inputPath}!`,
		accomplished: async (ongoing) =>
			`Formatted ${ongoing.inputPath} in ${ongoing.outputPath}.`,
		fulfilled: async (plan) =>
			plan.files > 0
				? `Successfully formatted a total of ${plan.files} JS and TS ${
						plan.files === 1 ? "file" : "files"
				  }.`
				: false,
	},
} satisfies Options) as Options;
