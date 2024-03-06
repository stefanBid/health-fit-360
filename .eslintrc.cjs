module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended'
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'vue'],

	rules: {
		'vue/no-unused-vars': 'warn',
		'vue/html-indent': ['warn', 2, { 'baseIndent': 1 }], // indentazione con 2 spazi
		'vue/html-self-closing': [
			'warn',
			{
				'html': {
					'void': 'always',
					'normal': 'never',
					'component': 'always'
				},
				'svg': 'always',
				'math': 'always'
			}
		],

		'vue/max-attributes-per-line': ['warn', {
			'singleline': {
				'max': 1
			},
			'multiline': {
				'max': 1
			}
		}],
		'vue/attributes-order': ['warn', {
			'order': [
				'DEFINITION',
				'LIST_RENDERING',
				'CONDITIONALS',
				'RENDER_MODIFIERS',
				'GLOBAL',
				'UNIQUE',
				'TWO_WAY_BINDING',
				'OTHER_DIRECTIVES',
				'OTHER_ATTR',
				'CONTENT',
				'EVENTS'
			],
			'alphabetical': false
		}],
		'vue/v-on-event-hyphenation': ['warn', 'always', {
			'autofix': false,
		}],
		'vue/no-lone-template': ['error', {
			'ignoreAccessible': true
		}],
		'vue/require-v-for-key': 'warn',
		'vue/valid-v-for': 'warn',
		'vue/no-v-html': 'warn',

		// ESLint rules
		'quotes': ['warn', 'single'],
		'indent': ['warn', 'tab', { 'SwitchCase': 1 }],
		'space-before-function-paren': ['warn', {
			'anonymous': 'always',
			'named': 'never',
			'asyncArrow': 'always'
		}],
		'object-curly-spacing': ['warn', 'always'],
		'keyword-spacing': ['warn', { 'before': true, 'after': true }],
		'space-infix-ops': ['warn', { 'int32Hint': false }],
		'array-bracket-spacing': ['warn', 'never'],
		'block-spacing': ['warn', 'always'],
		'comma-spacing': ['warn', { 'before': false, 'after': true }],
		'computed-property-spacing': ['warn', 'never'],
		'func-call-spacing': ['warn', 'never'],
		'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }],
		'no-trailing-spaces': 'warn',
		'no-whitespace-before-property': 'warn',
		'semi-spacing': ['warn', { 'before': false, 'after': true }],
		'space-before-blocks': ['warn', 'always'],
		'space-in-parens': ['warn', 'never'],
		'space-unary-ops': ['warn', {
			'words': true,
			'nonwords': false
		}],
		'spaced-comment': ['warn', 'always', {
			'line': {
				'markers': ['/'],
				'exceptions': ['-', '+']
			},
			'block': {
				'markers': ['!'],
				'exceptions': ['*'],
				'balanced': true
			}
		}],
		'arrow-spacing': ['warn', { 'before': true, 'after': true }],
		'no-multi-spaces': ['warn', { 'ignoreEOLComments': true }],
		'no-extra-parens': ['warn', 'all', { 'ignoreJSX': 'all', 'nestedBinaryExpressions': false }]
	}

};
