var t={files:"**/*.{js,mjs,cjs,ts}",pipeline:{failed:async e=>`Error: Cannot format file ${e.inputPath}!`,accomplished:async e=>`Formatted ${e.inputPath} in ${e.outputPath}.`,fulfilled:async e=>e.files>0?`Successfully formatted a total of ${e.files} JS and TS ${e.files===1?"file":"files"}.`:!1}};export{t as default};
