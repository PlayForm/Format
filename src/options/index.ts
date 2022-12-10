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
	// rome-ignore lint:
	[key: string]: any;

	rome?: boolean | ROME;
}

export const options = {
	files: "**/*.{js,mjs,cjs,ts}",
	pipeline: deepmerge(defaultOptions.pipeline, {
		failed: async (inputPath: optionCallbacksFile["inputPath"]) =>
			`Error: Cannot format file ${inputPath}!`,
		accomplished: async (
			inputPath: optionCallbacksFile["inputPath"],
			outputPath: optionCallbacksFile["outputPath"],
			_fileSizeBefore: optionCallbacksFile["fileSizeBefore"],
			_fileSizeAfter: optionCallbacksFile["fileSizeAfter"]
		) => `Formatted ${inputPath} in ${outputPath}.`,
		fulfilled: async (pipe: optionCallbacksPipe) =>
			`Successfully formatted a total of ${pipe.files} JS and TS ${
				pipe.files === 1 ? "file" : "files"
			}.`,
	} satisfies functionCallbacks),
};

export default options;
