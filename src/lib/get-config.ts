import { access, constants, readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";

export default async (file: string) => {
	const fileWorking = resolve(`${cwd()}/${file}`);

	let config = (
		await readFile(
			resolve(
				`${dirname(fileURLToPath(import.meta.url))}/../config/${file}`
			),
			"utf-8"
		)
	).toString();

	try {
		await access(fileWorking, constants.R_OK);
		config = (await readFile(fileWorking, "utf-8")).toString();
	} catch (_error) {}

	return config;
};
