/**
 * @module Option
 *
 */
declare const _default: {
	File: string;
	Cache: {
		Search: string;
		Folder: string;
	};
	Path: string;
	Logger: 2;
	Action: {
		Failed: (
			On: import("@playform/pipe/Target/Interface/File.js").default,
		) => Promise<string>;
		Accomplished: (
			On: import("@playform/pipe/Target/Interface/File.js").default,
		) => Promise<string>;
		Fulfilled: ({
			File,
		}: import("@playform/pipe/Target/Interface/Plan.js").default) => Promise<
			string | false
		>;
		Read: ({
			Input,
		}: import("@playform/pipe/Target/Interface/File.js").default) => Promise<string>;
		Wrote: ({
			Buffer,
		}: import("@playform/pipe/Target/Interface/File.js").default) => Promise<
			import("@playform/pipe/Target/Type/Buffer.js").Type
		>;
		Passed: (
			On: import("@playform/pipe/Target/Interface/File.js").default,
		) => Promise<true>;
		Changed: (
			Plan: import("@playform/pipe/Target/Interface/Plan.js").default,
		) => Promise<import("@playform/pipe/Target/Interface/Plan.js").default>;
	};
	Exclude: false;
	Biome: unknown;
};
export default _default;
