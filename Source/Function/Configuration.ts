/**
 * @module Configuration
 *
 */
export default async (_File: string) => {
	try {
		return (
			await readFile(
				resolve(`${(await import("process")).cwd()}/${_File}`),
				"utf-8"
			)
		).toString();
	} catch (_Error) {
		return (
			await readFile(
				resolve(
					`${(await import("path")).dirname(
						(await import("url")).fileURLToPath(import.meta.url)
					)}/../Notation/${_File}`
				),
				"utf-8"
			)
		).toString();
	}
};

export const { readFile } = await import("fs/promises");

export const { resolve } = await import("path");
