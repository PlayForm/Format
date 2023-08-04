import { Configuration, Distribution, Rome } from "@rometools/js-api";
import type { AstroIntegration } from "astro";
import { Files } from "files-pipe";
import Merge from "files-pipe/dist/Lib/Merge.js";
import type { Executions, Path } from "files-pipe/dist/options/Index.js";
import { resolve as Resolve } from "path";
import Config from "./Lib/GetConfig.js";
import type { Options } from "./options/Index.js";
import Defaults from "./options/Index.js";

export default (Options: Options = {}): AstroIntegration => {
	for (const Option in Options) {
		if (
			Object.prototype.hasOwnProperty.call(Options, Option) &&
			Options[Option] === true
		) {
			Options[Option] = Defaults[Option];
		}
	}

	const _options = Merge(Defaults, Options);

	const paths = new Set<Path>();

	if (typeof _options["path"] !== "undefined") {
		if (
			_options["path"] instanceof Array ||
			_options["path"] instanceof Set
		) {
			for (const path of _options["path"]) {
				paths.add(path);
			}
		}
	}

	return {
		name: "astro-rome",
		hooks: {
			"astro:build:done": async ({ dir }) => {
				try {
					if (!paths.size) {
						paths.add(dir);
					}

					const rome = await Rome.create({
						distribution: Distribution.NODE,
					});

					if (
						typeof _options.rome === "undefined" ||
						_options.rome === null
					) {
						_options.rome = JSON.parse(
							await Config("rome.json")
						);
					}

					if (_options.rome && _options.rome !== true) {
						_options.rome["$schema"] = undefined;
						rome.applyConfiguration(_options.rome as Configuration);
					}

					for (const path of paths) {
						await (
							await (
								await (
									await new Files(_options["logger"]).in(path)
								).By("**/*.{js,mjs,cjs,ts}")
							).not(_options["exclude"])
						).Pipe(
							Merge(Defaults["Pipe"], {
								Wrote: async (On) => {
									try {
										return rome.formatContent(
											On.buffer.toString(),
											{
												filePath: Resolve(On.Input),
											}
										).content;
									} catch (error) {
										return On.buffer;
									}
								},
							} satisfies Executions)
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
};
