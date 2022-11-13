import { BackendKind, Rome } from "@rometools/js-api";

import { resolve } from "path";
import type { Options } from "../options/index";
import parse from "./parse.js";

const rome = await Rome.create({
	backendKind: BackendKind.NODE,
});

export default async (path: string, settings: Options, debug: number = 2) => {
	for (const files in settings) {
		if (Object.prototype.hasOwnProperty.call(settings, files)) {
			const setting = settings[files];

			if (!setting) {
				continue;
			}

			switch (files) {
				case "rome": {
					await rome.applyConfiguration(setting);

					await parse(
						`${path}**/*.{js,mjs,cjs,ts}`,
						debug,
						settings?.exclude,
						async (data, file) =>
							(
								await rome.formatContent(data, {
									filePath: resolve(file),
								})
							).content
					);

					break;
				}

				default:
					break;
			}
		}
	}
};
