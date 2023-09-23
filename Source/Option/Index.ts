import type { Type as Rome } from "./Rome.js";

import type { Option as _Option } from "files-pipe";

import { Default, Merge } from "files-pipe";

export interface Type extends _Option {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;

	Rome?: boolean | Rome;
}

export default Merge(Default, {
	Action: {
		Failed: async (On) => `Error: Cannot format file ${On.Input}!`,
		Accomplished: async (On) => `Formatted ${On.Input} in ${On.Output}.`,
		Fulfilled: async (Plan) =>
			Plan.Files > 0
				? `Successfully formatted a total of ${Plan.Files} JS and TS ${
						Plan.Files === 1 ? "file" : "files"
				  }.`
				: false,
	},
} satisfies Type);
