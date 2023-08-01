import type { BuildOptions, PluginBuild } from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { rm } from "fs/promises";

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
						await rm(outDir, {
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
