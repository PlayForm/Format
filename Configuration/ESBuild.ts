import type { PluginBuild as Build, BuildOptions as Option } from "esbuild";
import { copy as Copy } from "esbuild-plugin-copy";
import {
	access as Access,
	constants as Constant,
	mkdir as Make,
	rm as Remove,
} from "fs/promises";

const Out = "Target";

export default {
	format: "esm",
	minify: true,
	outdir: Out,
	platform: "node",
	target: "esnext",
	write: true,
	plugins: [
		{
			name: "Target",
			setup(Build: Build) {
				Build.onStart(async () => {
					try {
						await Remove(Out, {
							recursive: true,
						});
					} catch (_Error) {}
				});
			},
		},
		Copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./Source/Configuration/rome.json",
					to: "./Configuration/",
				},
			],
		}),
	],
} satisfies Option;
