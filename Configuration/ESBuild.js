import { copy as Copy } from "esbuild-plugin-copy";
import {
	access as Access,
	constants as Constant,
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
			setup(Build) {
				Build.onStart(async () => {
					try {
						await Access(Out, Constant.R_OK);
						try {
							await Remove(Out, {
								recursive: true,
							});
						} catch (_Error) {
							console.log(_Error);
						}
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
};
