import { Configuration, Distribution, Rome } from "@rometools/js-api";
import type { AstroIntegration } from "astro";
import { files } from "files-pipe";
import Merge from "files-pipe/dist/lib/deepmerge.js";
import type { executions, optionPath } from "files-pipe/dist/options/Index.js";
import { resolve } from "path";
import getConfig from "./lib/GetConfig.js";
import type { Options } from "./options/Index.js";
import Defaults from "./options/Index.js";

export default (options: Options = {}): AstroIntegration => {
	for (const option in options) {
		if (
			Object.prototype.hasOwnProperty.call(options, option) &&
			options[option] === true
		) {
			options[option] = Defaults[option];
		}
	}

	const _options = Merge(Defaults, options);

	const paths = new Set<optionPath>();

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
							await getConfig("rome.json")
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
									await new files(_options["logger"]).in(path)
								).by("**/*.{js,mjs,cjs,ts}")
							).not(_options["exclude"])
						).Pipe(
							Merge(Defaults["Pipe"], {
								Wrote: async (On) => {
									try {
										return rome.formatContent(
											On.buffer.toString(),
											{
												filePath: resolve(
													On.inputPath
												),
											}
										).content;
									} catch (error) {
										return On.buffer;
									}
								},
							} satisfies executions)
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
};
