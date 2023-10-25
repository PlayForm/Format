/**
 * @module Integration
 *
 */
export default ((...[_Option = {}]: Parameters<Type>) => {
	for (const Option in _Option) {
		if (
			Object.prototype.hasOwnProperty.call(_Option, Option) &&
			_Option[Option] === true
		) {
			_Option[Option] = Default[Option as keyof typeof Default];
		}
	}

	const { Path } = Merge(Default, _Option);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Array.isArray(Path) || Path instanceof Set) {
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

				// const _Biome = await (
				// 	// @TODO: Import proper API
				// 	// await import()
				// 	await import('@biomejs/biome').default
				// ).Biome.create({
				// 	distribution:
				// 	// @TODO: Import proper distribution
				// 	// (await import()).Distribution.NODE,
				// });

				// const _Action = Merge(Action, {
				// 	Wrote: async (On) => {
				// 		try {
				// 			return _Biome.formatContent(On.Buffer.toString(), {
				// 				filePath: (await import("path")).resolve(
				// 					On.Input
				// 				),
				// 			}).content;
				// 		} catch (_Error) {
				// 			return On.Buffer;
				// 		}
				// 	},
				// } satisfies Action);

				// if (typeof Biome === "object" && _Biome) {
				// 	Biome["$schema"] = undefined;
				// 	_Biome.applyConfiguration(Biome);
				// }

				// for (const Path of Paths) {
				// 	await (
				// 		await (
				// 			await (
				// 				await new (await import("files-pipe")).default(
				// 					Cache,
				// 					Logger
				// 				).In(Path)
				// 			).By("**/*.{js,mjs,cjs,ts}")
				// 		).Not(Exclude)
				// 	).Pipe(_Action);
				// }
			},
		},
	};
}) satisfies Type as Type;

import type Type from "../Interface/Integration.js";

// import type Action from "files-pipe/Target/Interface/Action.js";
import type Path from "files-pipe/Target/Type/Path.js";

export const { default: Default } = await import("../Variable/Option.js");

export const { default: Merge } = await import(
	"typescript-esbuild/Target/Function/Merge.js"
);
