import { deepmerge } from "deepmerge-ts";
import { resolve } from "path";

import type { AstroIntegration } from "astro";

import { BackendKind, Rome } from "@rometools/js-api";

import pipeline from "@nikolarhristov/pipeline";
import type {
	functionCallbacks,
	Options as PipelineOptions,
} from "@nikolarhristov/pipeline/dist/options/index.js";
import type { Options as RomeOptions } from "./options/index.js";

import getConfig from "./lib/get-config.js";
import defaultOptions from "./options/index.js";

export default (
	_options: PipelineOptions & RomeOptions = {}
): AstroIntegration => {
	for (const option in _options) {
		if (
			Object.prototype.hasOwnProperty.call(_options, option) &&
			_options[option] === true
		) {
			_options[option] = defaultOptions[option];
		}
	}

	const __options = deepmerge(defaultOptions, _options);

	return {
		name: "astro-rome",
		hooks: {
			"astro:config:done": async (options) => {
				_options.path = _options.path
					? _options.path
					: options.config.outDir;
			},
			"astro:build:done": async () => {
				const rome = await Rome.create({
					backendKind: BackendKind.NODE,
				});

				if (
					typeof __options.rome === "undefined" ||
					__options.rome === null
				) {
					__options.rome = JSON.parse(await getConfig("rome.json"));
				}

				await rome.applyConfiguration(__options.rome);

				await new pipeline(
					deepmerge(__options, {
						pipeline: {
							wrote: async (file: string, data: string) =>
								(
									await rome.formatContent(data, {
										filePath: resolve(file),
									})
								).content,
						},
					} satisfies PipelineOptions)
				).process();
			},
		},
	};
};
