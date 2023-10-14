/**
 * @module Integration
 *
 */
export default (_Option: Option = {}): AstroIntegration => {
	for (const Option in _Option) {
		if (
			Object.prototype.hasOwnProperty.call(_Option, Option) &&
			_Option[Option] === true
		) {
			_Option[Option] = Default[Option as keyof typeof Default];
		}
	}

	const { Path, Cache, Logger, Exclude, Action, Biome } = Merge(
		Default,
		_Option
	);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Path instanceof Array || Path instanceof Set) {
			for (const _Path of Path) {
				Paths.add(_Path);
			}
		}
	}

	return {
		name: "astro-biome",
		hooks: {
			"astro:build:done": async ({ dir: Dir }) => {
				if (!Paths.size) {
					Paths.add(Dir);
				}

				const _Biome = await (
					// @TODO: Import proper API
					// await import()
				).Biome.create({
					distribution:
					// @TODO: Import proper distribution
					// (await import()).Distribution.NODE,
				});

				const _Action = Merge(Action, {
					Wrote: async (On) => {
						try {
							return _Biome.formatContent(On.Buffer.toString(), {
								filePath: (await import("path")).resolve(
									On.Input
								),
							}).content;
						} catch (_Error) {
							return On.Buffer;
						}
					},
				} satisfies Action);

				if (typeof Biome === "object" && _Biome) {
					Biome["$schema"] = undefined;
					_Biome.applyConfiguration(Biome);
				}

				for (const Path of Paths) {
					await (
						await (
							await (
								await new (await import("files-pipe")).default(
									Cache,
									Logger
								).In(Path)
							).By("**/*.{js,mjs,cjs,ts}")
						).Not(Exclude)
					).Pipe(_Action);
				}
			},
		},
	};
};

import type Option from "../Interface/Option.js";

import type Action from "files-pipe/Target/Interface/Action.js";
import type Path from "files-pipe/Target/Interface/Path.js";

import type { AstroIntegration } from "astro";

export const { default: Default } = await import("../Variable/Option.js");

export const { default: Merge } = await import(
	"typescript-esbuild/Target/Function/Merge.js"
);
