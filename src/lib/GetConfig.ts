import { constants } from "fs";
import { access, readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";

export default async (file: string) => {
	try {
		const working = resolve(`${cwd()}/${file}`);
		await access(working, constants.R_OK);
		return (await readFile(working, "utf-8")).toString();
	} catch (_error) {
		return (
			await readFile(
				resolve(
					`${dirname(
						fileURLToPath(import.meta.url)
					)}/../config/${file}`
				),
				"utf-8"
			)
		).toString();
	}
};
