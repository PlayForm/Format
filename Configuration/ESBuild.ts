/**
 * @module ESBuild
 *
 */
export default {
	color: true,
	format: "esm",
	metafile: true,
	minify: true,
	outdir: "Target",
	platform: "node",
	target: "esnext",
	write: true,
	logLevel: "debug",
	plugins: [
		{
			name: "Target",
			setup({ onStart, initialOptions: { outdir } }) {
				onStart(async () => {
					try {
						outdir
							? await (await import("fs/promises")).rm(outdir, {
									recursive: true,
							  })
							: {};
					} catch (_Error) {
						console.log(_Error);
					}
				});
			},
		},

		(await import("@playform/copy")).copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./Source/Notation/biome.json",
					to: "./Notation/",
				},
			],
		}),
	],
	define: {
		"process.env.VERSION_PACKAGE": `'${
			(
				await (
					await import("@playform/build/Target/Function/JSON.js")
				).default("package.json")
			)?.version
		}'`,
	},
} satisfies BuildOptions as BuildOptions;

import type { BuildOptions } from "esbuild";
