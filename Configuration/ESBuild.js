"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_plugin_copy_1 = require("esbuild-plugin-copy");
const promises_1 = require("fs/promises");
const Out = "Target";
exports.default = {
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
						await (0, promises_1.rm)(Out, {
							recursive: true,
						});
					} catch (_Error) {}
				});
			},
		},
		(0, esbuild_plugin_copy_1.copy)({
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
