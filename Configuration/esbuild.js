import { copy as Copy } from "esbuild-plugin-copy";
import { rm as Remove } from "fs/promises";
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
            setup(build) {
                build.onStart(async () => {
                    try {
                        await Remove(Out, {
                            recursive: true,
                        });
                    }
                    catch (_Error) {
                        console.log(_Error);
                    }
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
