import * as r from "fs";
import { resolve as e, dirname as n } from "path";
import { cwd as a } from "process";
import { fileURLToPath as c } from "url";
var p=async t=>{const o=e(`${a()}/${t}`);let i=r.readFileSync(e(`${n(c(import.meta.url))}/../config/${t}`),"utf-8").toString();try{await r.promises.access(o,r.constants.R_OK),i=r.readFileSync(o,"utf-8").toString()}catch{}return i};export { p as default };

