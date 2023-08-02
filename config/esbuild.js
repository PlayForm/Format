import { copy } from "esbuild-plugin-copy";
import { rm as Remove } from "fs/promises";
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
                        await Remove(outDir, {
                            recursive: true,
                        });
                    }
                    catch (_Error) { }
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
