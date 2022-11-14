import type ROME from "./rome";

export type filterFn = (file: string) => boolean;

export interface Options {
	// rome-ignore lint:
	[key: string]: any;

	path?: string | string[] | Set<string>;

	exclude?:
		| string
		| RegExp
		| filterFn
		| string[]
		| RegExp[]
		| filterFn[]
		| Set<string>
		| Set<RegExp>
		| Set<filterFn>;

	rome?: boolean | ROME;

	logger?: number;
}

export default (): Options => ({
	path: "./dist/",
	logger: 2,
});
