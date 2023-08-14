import type { AstroIntegration } from "astro";

import { Files } from "files-pipe";
import Merge from "files-pipe/Target/Library/Merge.js";
import type {
	Execution,
	Path as _Path,
} from "files-pipe/Target/Option/Index.js";

import type { Configuration } from "@rometools/js-api";
import { Distribution, Rome as _Rome } from "@rometools/js-api";
import { resolve as Resolve } from "path";

import Config from "./Library/GetConfig.js";

import type { Option } from "./Option/Index.js";
import Default from "./Option/Index.js";

export default (Options: Option = {}): AstroIntegration => {
	for (const Option in Options) {
		if (
			Object.prototype.hasOwnProperty.call(Options, Option) &&
			Options[Option] === true
		) {
			Options[Option] = Default[Option];
		}
	}

	const _Options = Merge(Default, Options);

	const Paths = new Set<_Path>();

	if (typeof _Options["Path"] !== "undefined") {
		if (
			_Options["Path"] instanceof Array ||
			_Options["Path"] instanceof Set
		) {
			for (const Path of _Options["Path"]) {
				Paths.add(Path);
			}
		}
	}

	return {
		name: "astro-rome",
		hooks: {
			"astro:build:done": async ({ dir: Dir }) => {
				try {
					if (!Paths.size) {
						Paths.add(Dir);
					}

					const Rome = await _Rome.create({
						distribution: Distribution.NODE,
					});

					if (
						typeof _Options.Rome === "undefined" ||
						_Options.Rome === null
					) {
						_Options.Rome = JSON.parse(await Config("rome.json"));
					}

					if (_Options.Rome && _Options.Rome !== true) {
						_Options.Rome["$schema"] = undefined;
						Rome.applyConfiguration(_Options.Rome as Configuration);
					}

					for (const Path of Paths) {
						await (
							await (
								await (
									await new Files(_Options["Logger"]).In(Path)
								).By("**/*.{js,mjs,cjs,ts}")
							).Not(_Options["Exclude"])
						).Pipe(
							Merge(Default["Pipe"], {
								Wrote: async (On) => {
									try {
										return Rome.formatContent(
											On.Buffer.toString(),
											{
												filePath: Resolve(On.Input),
											}
										).content;
									} catch (_Error) {
										return On.Buffer;
									}
								},
							} satisfies Execution)
						);
					}
				} catch (_Error) {
					console.log(_Error);
				}
			},
		},
	};
};
