import type { executions, optionPath } from "files-pipe/dist/options/index.js";
import { Configuration, Distribution, Rome } from "@rometools/js-api";
import deepmerge from "files-pipe/dist/lib/deepmerge.js";
import type { Options } from "./options/index.js";
import type { AstroIntegration } from "astro";
import getConfig from "./lib/get-config.js";
import defaults from "./options/index.js";
import { files } from "files-pipe";
import { resolve } from "path";

export default (options: Options = {}): AstroIntegration => {
	for (const option in options) {
		if (
			Object.prototype.hasOwnProperty.call(options, option) &&
			options[option] === true
		) {
			options[option] = defaults[option];
		}
	}

	const _options = deepmerge(defaults, options);

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
						).pipe(
							deepmerge(defaults["pipe"], {
								wrote: async (ongoing) => {
									try {
										return rome.formatContent(
											ongoing.buffer.toString(),
											{
												filePath: resolve(
													ongoing.inputPath
												),
											}
										).content;
									} catch (error) {
										return ongoing.buffer;
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
