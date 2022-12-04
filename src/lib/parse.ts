import FastGlob from "fast-glob";
import * as fs from "fs";

import type { Options } from "../options/index.js";

export default async (
	glob: string,
	debug: number = 2,
	exclude: Options["exclude"],
	// rome-ignore lint:
	write: (data: string, file: string) => any = async (data) => data,
	// rome-ignore lint:
	read: (file: string) => any = async (file) =>
		await fs.promises.readFile(file, "utf-8")
) => {
	const files = await FastGlob(glob);

	const formats = {
		files: 0,
		total: 0,
	};

	let filters = new Set();

	if (typeof exclude !== "undefined") {
		if (exclude instanceof Array || exclude instanceof Set) {
			for (const excludes of exclude) {
				filters.add(excludes);
			}
		} else {
			filters.add(exclude);
		}
	}

	for (const filter of filters) {
		if (typeof filter === "string") {
			for (const file of files) {
				if (file.match(filter)) {
					files.splice(files.indexOf(file), 1);
				}
			}
		}

		if (typeof filter === "function") {
			for (const file of files) {
				if (filter(file)) {
					files.splice(files.indexOf(file), 1);
				}
			}
		}
	}

	for (const file of files) {
		try {
			const writeBuffer = await write(await read(file), file);

			if (!writeBuffer) {
				continue;
			}

			await fs.promises.writeFile(file, writeBuffer, "utf-8");

			formats.files++;

			if (debug > 1) {
				console.info(
					`Formatted ${file.replace(
						/^.*[\\\/]/,
						""
					)}.`
				);
			}
		} catch (_error) {
			console.log(`Error: Cannot format file ${file}!`);
		}
	}

	if (debug > 0 && formats.files > 0) {
		console.info(
			`Successfully formatted a total of ${formats.files} ${
				formats.files === 1 ? "file" : "files"
			}.`
		);
	}
};
