import type { AstroIntegration } from "astro";

import type { Action, Path as _Path } from "files-pipe";
import { Files, Merge } from "files-pipe";

import type { Configuration } from "@rometools/js-api";
import { Distribution, Rome as _Rome } from "@rometools/js-api";
import { resolve as Resolve } from "path";

import Config from "./Library/GetConfig.js";

import type { Option } from "./Option/Index.js";
import Default from "./Option/Index.js";

export default (_Option: Option = {}): AstroIntegration => {
	for (const Option in _Option) {
		if (
			Object.prototype.hasOwnProperty.call(_Option, Option) &&
			_Option[Option] === true
		) {
			_Option[Option] = Default[Option];
		}
	}

	const __Option = Merge(Default, _Option);

	const Paths = new Set<_Path>();

	if (typeof __Option["Path"] !== "undefined") {
		if (
			__Option["Path"] instanceof Array ||
			__Option["Path"] instanceof Set
		) {
			for (const Path of __Option["Path"]) {
				Paths.add(Path);
			}
		}
	}

	return {
		name: "astro-rome",
		hooks: {
			"astro:build:done": async ({ dir: Dir }) => {
				try {
					if (!Paths.size) {
						Paths.add(Dir);
					}

					const Rome = await _Rome.create({
						distribution: Distribution.NODE,
					});

					if (
						typeof __Option.Rome === "undefined" ||
						__Option.Rome === null
					) {
						__Option.Rome = JSON.parse(await Config("rome.json"));
					}

					if (__Option.Rome && __Option.Rome !== true) {
						__Option.Rome["$schema"] = undefined;
						Rome.applyConfiguration(__Option.Rome as Configuration);
					}

					for (const Path of Paths) {
						await (
							await (
								await (
									await new Files(__Option["Logger"]).In(Path)
								).By("**/*.{js,mjs,cjs,ts}")
							).Not(__Option["Exclude"])
						).Pipe(
							Merge(Default["Action"], {
								Wrote: async (On) => {
									try {
										return Rome.formatContent(
											On.Buffer.toString(),
											{
												filePath: Resolve(On.Input),
											}
										).content;
									} catch (_Error) {
										return On.Buffer;
									}
								},
							} satisfies Action)
						);
					}
				} catch (_Error) {}
			},
		},
	};
};
