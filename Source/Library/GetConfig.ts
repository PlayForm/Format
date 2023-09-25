export default async (_File: string) => {
	try {
		const Working = resolve(`${(await import("process")).cwd()}/${_File}`);
		await (
			await import("fs/promises")
		).access(Working, (await import("fs")).constants.R_OK);
		return (await readFile(Working, "utf-8")).toString();
	} catch (_Error) {
		return (
			await readFile(
				resolve(
					`${(await import("path")).dirname(
						(await import("url")).fileURLToPath(import.meta.url)
					)}/../Configuration/${_File}`
				),
				"utf-8"
			)
		).toString();
	}
};

export const { readFile } = await import("fs/promises");

export const { resolve } = await import("path");
