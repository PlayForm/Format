import { Rome, BackendKind } from "@rometools/js-api";

import type { Options } from "../options/index";
import parse from "./parse.js";
import { resolve } from "path";

const rome = await Rome.create({
	backendKind: BackendKind.NODE,
});

export default async (settings: Options, debug: number = 2) => {
	for (const files in settings) {
		if (Object.prototype.hasOwnProperty.call(settings, files)) {
			const setting = settings[files];

			if (!setting) {
				continue;
			}

			switch (files) {
				case "rome": {
					await parse(
						`${settings.path}**/*.{js,mjs,cjs,ts,json}`,
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
