import type { Options as OptionsBase } from "files-pipeline/dist/options/index.js";

import type ROME from "./rome.js";

export type filterFn = (file: string) => boolean;

export interface Options extends OptionsBase {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;

	rome?: boolean | ROME;
}

export default {
	files: "**/*.{js,mjs,cjs,ts}",
	pipeline: {
		failed: async (current) =>
			`Error: Cannot format file ${current.inputPath}!`,
		accomplished: async (current) =>
			`Formatted ${current.inputPath} in ${current.outputPath}.`,
		fulfilled: async (pipe) =>
			pipe.files > 0
				? `Successfully formatted a total of ${pipe.files} JS and TS ${
						pipe.files === 1 ? "file" : "files"
				  }.`
				: false,
	},
} satisfies Options;
