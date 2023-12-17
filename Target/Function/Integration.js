var i = (...[t = {}]) => {
	Object.entries(t).forEach(([e, f]) =>
		Object.defineProperty(t, e, { value: f === !0 ? o[e] : t[e] }),
	);
	const { Path: a } = s(o, t),
		r = new Set();
	return (
		typeof a < "u" &&
			(Array.isArray(a) || a instanceof Set) &&
			a.forEach((e) => r.add(e)),
		{
			name: "astro-biome",
			hooks: {
				"astro:build:done": async ({ dir: e }) => {
					r.size || r.add(e);
				},
			},
		}
	);
};
const { default: o } = await import("../Variable/Option.js"),
	{ default: s } = await import(
		"typescript-esbuild/Target/Function/Merge.js"
	);
export { o as Default, s as Merge, i as default };
