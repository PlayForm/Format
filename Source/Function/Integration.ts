import type Action from "@playform/pipe/Target/Interface/Action.js";
import type Path from "@playform/pipe/Target/Type/Path.js";

import type Interface from "../Interface/Integration.js";

/**
 * @module Integration
 *
 */
export default ((...[_Option = {}]) => {
	Object.entries(_Option).forEach(([Key, Value]) =>
		Object.defineProperty(_Option, Key, {
			value:
				Value === true
					? Default[Key as keyof typeof Default]
					: _Option[Key as keyof typeof _Option],
		}),
	);

	const { Path, Cache, Logger, Exclude, Action, Biome } = Merge(
		Default,
		_Option,
	);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Array.isArray(Path) || Path instanceof Set) {
			Path.forEach((Path) => Paths.add(Path));
		}

		if (Path instanceof Map) {
			Paths.add(Path);
		}
	}

	return {
		name: "@playform/format",
		hooks: {
			"astro:build:done": async ({ dir: Directory }) => {
				if (Paths.size === 0) {
					Paths.add(Directory);
				}

				const _Biome = await (
					await import("@biomejs/js-api")
				).Biome.create({
					distribution: (await import("@biomejs/js-api")).Distribution
						.NODE,
				});

				try {
					if (Biome && typeof Biome === "object") {
						_Biome.applyConfiguration(Biome);
					}
				} catch (_Error) {
					console.log(_Error);
				}

				const _Action = Merge(Action, {
					Wrote: async ({ Buffer, Output }) => {
						try {
							return _Biome.formatContent(Buffer.toString(), {
								filePath: (await import("path")).resolve(
									Output,
								),
							}).content;
						} catch (_Error) {
							console.log(_Error);

							return Buffer;
						}
					},
					// TODO: FINISH THIS
					// Passed: async ({ Buffer, Output }) => {
					// 	try {
					// 		_Biome
					// 			.lintContent(Buffer.toString(), {
					// 				filePath: (
					// 					await import("path")
					// 				).resolve(Output),
					// 			})
					// 			.diagnostics.forEach(
					// 				({ location: { path } }) => {
					// 					console.log(Output);

					// 				},
					// 			);
					// 	} catch (_Error) {
					// 		console.log(_Error);
					// 	}

					// 	return true;
					// },
				} satisfies Action);

				for (const Path of Paths) {
					await (
						await (
							await (
								await new (
									await import("@playform/pipe")
								).default(Cache, Logger).In(Path)
							).By("**/*.{js,mjs,cjs,ts,json}")
						).Not(Exclude)
					).Pipe(_Action);
				}
			},
		},
	};
}) satisfies Interface as Interface;

export const { default: Default } = await import("@Variable/Option.js");

export const { default: Merge } = await import("@Function/Merge.js");
