import type Interface from "../Interface/Configuration.js";

/**
 * @module Configuration
 *
 */
export default (async (...[File]) => {
	try {
		return (
			await readFile(
				resolve(`${(await import("process")).cwd()}/${File}`),
				"utf-8",
			)
		).toString();
	} catch (_Error) {
		return (
			await readFile(
				resolve(
					`${(await import("path")).dirname(
						(await import("url")).fileURLToPath(import.meta.url),
					)}/../../${File}`,
				),
				"utf-8",
			)
		).toString();
	}
}) satisfies Interface as Interface;

export const { readFile } = await import("fs/promises");

export const { resolve } = await import("path");
