import deepmerge from "files-pipe/Target/Library/Merge.js";
import type { Options as OptionsBase } from "files-pipe/Target/Options/Index.js";
import defaults from "files-pipe/Target/Options/Index.js";
import type { ROME } from "./ROME.js";

export interface Options extends OptionsBase {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;

	rome?: boolean | ROME;
}

export default deepmerge(defaults, {
	Pipe: {
		Failed: async (ongoing) =>
			`Error: Cannot format file ${ongoing.Input}!`,
		accomplished: async (ongoing) =>
			`Formatted ${ongoing.Input} in ${ongoing.outputPath}.`,
		Fulfilled: async (plan) =>
			plan.Files > 0
				? `Successfully formatted a total of ${plan.Files} JS and TS ${
						plan.Files === 1 ? "file" : "files"
				  }.`
				: false,
	},
} satisfies Options) as Options;
