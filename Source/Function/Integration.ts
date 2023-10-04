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

	const { Path, Cache, Logger, Exclude, Action, Rome } = Merge(
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
		name: "astro-rome",
		hooks: {
			"astro:build:done": async ({ dir: Dir }) => {
				if (!Paths.size) {
					Paths.add(Dir);
				}

				const _Rome = await (
					await import("@rometools/js-api")
				).Rome.create({
					distribution: (await import("@rometools/js-api"))
						.Distribution.NODE,
				});

				const _Action = Merge(Action, {
					Wrote: async (On) => {
						try {
							return _Rome.formatContent(On.Buffer.toString(), {
								filePath: (await import("path")).resolve(
									On.Input
								),
							}).content;
						} catch (_Error) {
							return On.Buffer;
						}
					},
				} satisfies Action);

				if (typeof Rome === "object" && _Rome) {
					Rome["$schema"] = undefined;
					_Rome.applyConfiguration(Rome);
				}

				Paths.forEach(async (Path) => {
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
				});
			},
		},
	};
};

import type Option from "../Interface/Option.js";

import type Action from "files-pipe/Target/Interface/Action.js";
import type Path from "files-pipe/Target/Interface/Path.js";

import type { AstroIntegration } from "astro";

export const { default: Default } = await import("../Object/Option.js");

export const { default: Merge } = await import(
	"files-pipe/Target/Function/Merge.js"
);
