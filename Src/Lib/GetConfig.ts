import { constants as Constant } from "fs";
import { access as Access, readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";

import { cwd as Current } from "process";
import { fileURLToPath as Path } from "url";

export default async (_File: string) => {
	try {
		const Working = Resolve(`${Current()}/${_File}`);
		await Access(Working, Constant.R_OK);
		return (await File(Working, "utf-8")).toString();
	} catch (_Error) {
		return (
			await File(
				Resolve(`${Dir(Path(import.meta.url))}/../config/${_File}`),
				"utf-8"
			)
		).toString();
	}
};
