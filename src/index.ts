import { Distribution, Rome } from "@rometools/js-api";
import type { AstroIntegration } from "astro";
import { files } from "files-pipe";
import deepmerge from "files-pipe/dist/lib/deepmerge.js";
import type { executions, optionPath } from "files-pipe/dist/options/index.js";
import { resolve } from "path";
import getConfig from "./lib/get-config.js";
import type { Options } from "./options/index.js";
import defaults from "./options/index.js";

export default (options: Options = {}): AstroIntegration => {
	for (const option in options) {
		if (
			Object.prototype.hasOwnProperty.call(options, option) &&
			options[option] === true
		) {
			options[option] = defaults[option];
		}
	}

	options = deepmerge(defaults, options);

	const paths = new Set<optionPath>();

	if (typeof options["path"] !== "undefined") {
		if (
			options["path"] instanceof Array ||
			options["path"] instanceof Set
		) {
			for (const path of options["path"]) {
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
						typeof options.rome === "undefined" ||
						options.rome === null
					) {
						options.rome = JSON.parse(await getConfig("rome.json"));
					}

					if (options.rome && options.rome !== true) {
						options.rome["$schema"] = undefined;
						rome.applyConfiguration(options.rome);
					}

					for (const path of paths) {
						await (
							await (
								await (
									await new files(options["logger"]).in(path)
								).by("**/*.{js,mjs,cjs,ts}")
							).not(options["exclude"])
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
										console.log(error);
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
