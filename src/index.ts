import type {
	executions,
	optionPath,
} from "files-pipeline/dist/options/index.js";

import { Rome, Distribution } from "@rometools/js-api";

import type { AstroIntegration } from "astro";

import type { Options } from "./options/index.js";

import defaults from "./options/index.js";

import { resolve } from "path";

import { files } from "files-pipeline";

import getConfig from "./lib/get-config.js";

import deepmerge from "files-pipeline/dist/lib/deepmerge.js";

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
		} else {
			paths.add(options["path"]);
		}
	}
	return {
		name: "astro-rome",
		hooks: {
			"astro:build:done": async () => {
				if (!options["rome"]) {
					return;
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
					rome.applyConfiguration(options.rome);
				}

				for (const path of paths) {
					await (
						await (
							await (
								await new files(options["logger"]).in(path)
							).by("**/*.{js,mjs,cjs,ts}")
						).not(options["exclude"])
					).pipeline(
						deepmerge(defaults["pipeline"], {
							wrote: async (current) =>
								rome.formatContent(current.buffer.toString(), {
									filePath: resolve(current.inputPath),
								}).content,
						} satisfies executions)
					);
				}
			},
		},
	};
};
