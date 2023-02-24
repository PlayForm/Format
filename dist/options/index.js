import t from "files-pipeline/dist/lib/deepmerge.js";
import i from "files-pipeline/dist/options/index.js";
var a=t(i,{pipeline:{failed:async e=>`Error: Cannot format file ${e.inputPath}!`,accomplished:async e=>`Formatted ${e.inputPath} in ${e.outputPath}.`,fulfilled:async e=>e.files>0?`Successfully formatted a total of ${e.files} JS and TS ${e.files===1?"file":"files"}.`:!1}});export { a as default };

