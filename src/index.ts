import type { AstroIntegration } from "astro";
import { deepmerge } from "deepmerge-ts";

import pipeAll from "./lib/pipe-all.js";
import defaultOptions, { Options } from "./options/index.js";
import forwardSlashIt from "./lib/forward-slash-it.js";
import getConfig from "./lib/get-config.js";

const romeConfig = JSON.parse(await getConfig("rome.json"));

export default (options: Options = {}): AstroIntegration => {
	for (const option in options) {
		if (
			Object.prototype.hasOwnProperty.call(options, option) &&
			options[option] === true
		) {
			options[option] = defaultOptions()[option];
		}
	}

	const _options = deepmerge(defaultOptions(), options);

	if (typeof _options.rome === "undefined" || _options.rome === null) {
		_options.rome = romeConfig;
	}

	return {
		name: "astro-rome",
		hooks: {
			"astro:config:done": async (options) => {
				_options.path = _options.path
					? _options.path
					: options.config.outDir;
			},
			"astro:build:done": async () => {
				let paths = new Set<string>();

				if (typeof _options.path !== "undefined") {
					if (
						_options.path instanceof Array ||
						_options.path instanceof Set
					) {
						for (const path of _options.path) {
							paths.add(forwardSlashIt(path));
						}
					} else {
						paths.add(forwardSlashIt(_options.path));
					}
				}

				for (const path of paths) {
					await pipeAll(path, _options, _options.logger);
				}
			},
		},
	};
};
