import { constants as i } from "fs";
import { readFile as a, access as s } from "fs/promises";
import { dirname as e, resolve as o } from "path";
import { cwd as n } from "process";
import { fileURLToPath as m } from "url";
var g=async t=>{try{const r=o(`${n()}/${t}`);return await s(r,i.R_OK),(await a(r,"utf-8")).toString()}catch{return(await a(o(`${e(m(import.meta.url))}/../Configuration/${t}`),"utf-8")).toString()}};export { g as default };

