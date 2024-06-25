/**
 * @module Integration
 *
 */
export default ((...[_Option = {}]: Parameters<Interface>) => {
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

				if (Biome && typeof Biome === "object") {
					_Biome.applyConfiguration(Biome);
				}

				const _Action = Merge(Action, {
					Wrote: async (On) => {
						try {
							return _Biome.formatContent(On.Buffer.toString(), {
								filePath: (await import("node:path")).resolve(
									On.Input,
								),
							}).content;
						} catch (_Error) {
							return On.Buffer;
						}
					},
				} satisfies Action);

				// try {
				// 	if (typeof Biome === "object" && _Biome) {
				// 		// @ts-ignore
				// 		Biome["$schema"] = undefined;
				// 		_Biome.applyConfiguration(Biome);
				// 	}
				// } catch (_Error) {
				// 	console.log(_Error);
				// }

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

import type Interface from "../Interface/Integration.js";

import type Action from "@playform/pipe/Target/Interface/Action.js";
import type Path from "@playform/pipe/Target/Type/Path.js";

export const { default: Default } = await import("@Variable/Option.js");

export const { default: Merge } = await import("@Function/Merge.js");
