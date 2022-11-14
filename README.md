# [astro-rome] 🏛️

This **[Astro integration][astro-integration]** brings Rome tools your Astro
project.

[Rome][rome]

## Installation

There are two ways to add integrations to your project. Let's try the most
convenient option first!

### `astro add` command

Astro includes a CLI tool for adding first party integrations: `astro add`. This
command will:

1. (Optionally) Install all necessary dependencies and peer dependencies
2. (Also optionally) Update your `astro.config.*` file to apply this integration

To install `astro-rome`, run the following from your project directory and
follow the prompts:

```sh
# Using NPM
npx astro add astro-rome
# Using Yarn
yarn astro add astro-rome
# Using PNPM
pnpx astro add astro-rome
```

### Install dependencies manually

First, install the `astro-rome` integration like so:

```
npm install -D -E astro-rome
```

Then, apply this integration to your `astro.config.*` file using the
`integrations` property:

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default { integrations: [rome()] };
```

## Getting started

The utility should now format and lint with rome all JavaScript, TypeScript and
CommonJS modules in the `dist` folder.

You can override any of the default options from the configurations of:

-   [rome](src/options/rome.ts)

or disable them entirely:

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default {
	integrations: [
		rome({
			rome: false,
		}),
	],
};
```

> **Note**
>
> If you provide a `rome.json` config file the utility should pick it up
> automatically. The configuration options from the `astro.config.ts` file
> override the `rome.json` config.

If your path is different than `dist` be sure to update it accordingly:

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default {
	outDir: "./build",
	integrations: [
		rome({
			path: "./build",
		}),
	],
};
```

You can add multiple paths to validate by specifying an array as the `path`
variable.

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default {
	integrations: [
		rome({
			path: ["./src", "./dist"],
		}),
	],
};
```

Set logger to 0 if you do not want to see debug messages. Default is 2.

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default {
	integrations: [
		rome({
			logger: 0,
		}),
	],
};
```

You can provide a filter to exclude files from formatting. A filter can be an
array of regexes or a single match. You can use functions, as well to match on
file names.

**`astro.config.ts`**

```ts
import rome from "astro-rome";

export default {
	integrations: [
		rome({
			exclude: [
				"firebase.ts",
				(file: string) => file === "./src/lib/test.ts",
			],
		}),
	],
};
```

[astro-rome]: https://npmjs.org/astro-rome
[rome]: https://npmjs.org/rome
[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
