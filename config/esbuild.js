import { copy } from "esbuild-plugin-copy";
import * as fs from "fs";
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
			setup(build) {
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
};
