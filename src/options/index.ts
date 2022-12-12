import { deepmerge } from "deepmerge-ts";

import type {
	Options as OptionsBase,
	optionCallbacksFile,
	optionCallbacksPipe,
	functionCallbacks,
} from "@nikolarhristov/pipeline/dist/options/index.js";
import defaultOptions from "@nikolarhristov/pipeline/dist/options/index.js";

import type ROME from "./rome.js";

export type filterFn = (file: string) => boolean;

export interface Options extends OptionsBase {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;

	rome?: boolean | ROME;
}

export const options = {
	files: "**/*.{js,mjs,cjs,ts}",
	pipeline: deepmerge(defaultOptions.pipeline, {
		failed: async (inputPath: optionCallbacksFile["inputPath"]) =>
			`Error: Cannot format file ${inputPath}!`,
		accomplished: async (current: optionCallbacksFile) =>
			`Formatted ${current.inputPath} in ${current.outputPath}.`,
		fulfilled: async (pipe: optionCallbacksPipe) =>
			pipe.files > 0
				? `Successfully formatted a total of ${pipe.files} JS and TS ${
						pipe.files === 1 ? "file" : "files"
				  }.`
				: false,
	} satisfies functionCallbacks),
};

export default options;
