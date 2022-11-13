import type ROME from "./rome";

export type filterFunction = (file: string) => boolean;

export interface Options {
	// rome-ignore lint:
	[key: string]: any;

	path?: string | [string];

	exclude?:
		| string
		| RegExp
		| filterFunction
		| [string]
		| [RegExp]
		| [filterFunction];

	rome?: boolean | ROME;

	logger?: number;
}

export default (): Options => ({
	path: "./dist/",
	rome: {
		"formatter": {
			"enabled": true,
			"formatWithErrors": true,
			"indentSize": 4,
			"lineWidth": 80,
			"indentStyle": "tab",
		},
		"javascript": {
			"formatter": {
				"quoteProperties": "preserve",
				"quoteStyle": "double",
				"trailingComma": "all",
			},
		},
		"linter": {
			"enabled": true,
			"rules": {
				"recommended": true,
				"a11y": {
					"noAutofocus": "error",
					"noPositiveTabindex": "error",
					"recommended": true,
					"useAltText": "error",
					"useAnchorContent": "error",
					"useBlankTarget": "error",
					"useButtonType": "error",
					"useKeyWithClickEvents": "error",
					"useKeyWithMouseEvents": "error",
					"useValidAnchor": "error",
				},
				"complexity": {
					"noExtraBooleanCast": "error",
					"recommended": true,
					"useSimplifiedLogicExpression": "error",
				},
				"correctness": {
					"noArguments": "error",
					"noArrayIndexKey": "error",
					"noAsyncPromiseExecutor": "error",
					"noCatchAssign": "error",
					"noChildrenProp": "error",
					"noCommentText": "error",
					"noCompareNegZero": "error",
					"noDebugger": "error",
					"noDelete": "error",
					"noDoubleEquals": "error",
					"noDupeArgs": "error",
					"noEmptyPattern": "error",
					"noFunctionAssign": "error",
					"noImportAssign": "error",
					"noLabelVar": "error",
					"noMultipleSpacesInRegularExpressionLiterals": "error",
					"noNewSymbol": "error",
					"noRenderReturnValue": "error",
					"noRestrictedGlobals": "error",
					"noShadowRestrictedNames": "error",
					"noSparseArray": "error",
					"noUndeclaredVariables": "error",
					"noUnnecessaryContinue": "error",
					"noUnreachable": "error",
					"noUnsafeNegation": "error",
					"noUnusedVariables": "error",
					"noUselessFragments": "error",
					"noVoidElementsWithChildren": "error",
					"recommended": true,
					"useSingleCaseStatement": "error",
					"useValidTypeof": "error",
					"useWhile": "error",
				},
				"nursery": {
					"noBannedTypes": "error",
					"noConstAssign": "error",
					"noExplicitAny": "error",
					"noInvalidConstructorSuper": "error",
					"recommended": true,
					"useCamelCase": "error",
					"useExhaustiveDependencies": "error",
					"useFlatMap": "error",
					"useValidForDirection": "error",
				},
				"security": {
					"noDangerouslySetInnerHtml": "error",
					"noDangerouslySetInnerHtmlWithChildren": "error",
					"recommended": true,
				},
				"style": {
					"noImplicitBoolean": "error",
					"noNegationElse": "error",
					"noShoutyConstants": "error",
					"noUnusedTemplateLiteral": "error",
					"recommended": true,
					"useBlockStatements": "error",
					"useFragmentSyntax": "error",
					"useOptionalChain": "error",
					"useSelfClosingElements": "error",
					"useShorthandArrayType": "error",
					"useSingleVarDeclarator": "error",
					"useTemplate": "error",
				},
			},
		},
	},
	logger: 2,
});
