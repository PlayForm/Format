import Merge from "files-pipe/Target/Library/Merge.js";
import type { Option as _Option } from "files-pipe/Target/Option/Index.js";
import Default from "files-pipe/Target/Option/Index.js";
import type { Rome } from "./Rome.js";

export interface Option extends _Option {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;

	Rome?: boolean | Rome;
}

export default Merge(Default, {
	Pipe: {
		Failed: async (On) => `Error: Cannot format file ${On.Input}!`,
		Accomplished: async (On) => `Formatted ${On.Input} in ${On.Output}.`,
		Fulfilled: async (Plan) =>
			Plan.Files > 0
				? `Successfully formatted a total of ${Plan.Files} JS and TS ${
						Plan.Files === 1 ? "file" : "files"
				  }.`
				: false,
	},
} satisfies Option) as Option;
