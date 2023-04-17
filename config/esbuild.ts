import type { BuildOptions, PluginBuild } from "esbuild";
import * as fs from "fs";

import { copy } from "esbuild-plugin-copy";

const outDir = "dist";

export default {
	format: "esm",
	minify: true,
	outdir: outDir,
	platform: "node",
	target: "esnext",
	write: true,
	plugins: [
		{
			name: "clean-dist",
			setup(build: PluginBuild) {
				build.onStart(async () => {
					try {
						await fs.promises.rm(outDir, {
							recursive: true,
						});
					} catch (_error) {}
				});
			},
		},
		copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./src/config/rome.json",
					to: "./config/",
				},
			],
		}),
	],
} satisfies BuildOptions;
