import { deepmerge } from "deepmerge-ts";
import { resolve } from "path";

import type { AstroIntegration } from "astro";

import { Rome, Distribution } from "@rometools/js-api";

import { pipeline } from "@nikolarhristov/pipeline";
import type { Options as PipelineOptions } from "@nikolarhristov/pipeline/dist/options/index.js";
import type { Options as RomeOptions } from "./options/index.js";

import getConfig from "./lib/get-config.js";
import defaults from "./options/index.js";
import type ROME from "./options/rome.js";

export default (
	options: PipelineOptions & RomeOptions = {}
): AstroIntegration => {
	for (const option in options) {
		if (
			Object.prototype.hasOwnProperty.call(options, option) &&
			options[option] === true
		) {
			// @ts-ignore
			options[option] = defaults[option];
		}
	}

	options = deepmerge(defaults, options);

	return {
		name: "astro-rome",
		hooks: {
			"astro:build:done": async () => {
				const rome = await Rome.create({
					distribution: Distribution.NODE,
				});

				if (
					typeof options.rome === "undefined" ||
					options.rome === null
				) {
					options.rome = JSON.parse(
						await getConfig("rome.json")
					) as ROME;
				}

				if (options.rome && options.rome !== true) {
					rome.applyConfiguration(options.rome);
				}

				await new pipeline(
					deepmerge(options, {
						pipeline: {
							wrote: async (current) =>
								rome.formatContent(current.buffer.toString(), {
									filePath: resolve(current.inputPath),
								}).content,
						},
					} satisfies PipelineOptions)
				).process();
			},
		},
	};
};
