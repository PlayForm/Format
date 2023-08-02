import { constants as Constant } from "fs";
import { access as Access, readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";

import { cwd as Current } from "process";
import { fileURLToPath as URL } from "url";

export default async (file: string) => {
	try {
		const working = Resolve(`${Current()}/${file}`);
		await Access(working, Constant.R_OK);
		return (await File(working, "utf-8")).toString();
	} catch (_error) {
		return (
			await File(
				Resolve(
					`${Dir(
						URL(import.meta.url)
					)}/../config/${file}`
				),
				"utf-8"
			)
		).toString();
	}
};
