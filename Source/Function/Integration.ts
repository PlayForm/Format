/**
 * @module Integration
 *
 */
export default ((...[_Option = {}]: Parameters<Type>) => {
	Object.entries(_Option).forEach(([Key, Value]) =>
		Object.defineProperty(_Option, Key, {
			value:
				Value === true
					? Default[Key as keyof typeof Default]
					: _Option[Key as keyof typeof _Option],
		})
	);

	const { Path } = Merge(Default, _Option);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Array.isArray(Path) || Path instanceof Set) {
			Path.forEach((Path) => Paths.add(Path));
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

import type Path from "files-pipe/Target/Type/Path.js";

export const { default: Default } = await import("../Variable/Option.js");

export const { default: Merge } = await import(
	"typescript-esbuild/Target/Function/Merge.js"
);
