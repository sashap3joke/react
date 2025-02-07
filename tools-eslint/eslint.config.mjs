import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends('eslint:recommended'),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 12,
            sourceType: 'module',
        },
        rules: {
            // Enforce indent of 4 spaces
            indent: ['error', 4],

            // Require spaces around operators
            'space-infix-ops': 'error',

            // Enforce the consistent use of single quotes
            quotes: ['error', 'single'],

            // Require `let` or `const` instead of `var`
            'no-var': 'error',

            // Require `const` declarations for variables that are never reassigned after declared
            'prefer-const': 'error',

            // Enforce the use of `===` and `!==`
            eqeqeq: ['error', 'always'],

            // Disallow the use of `console`
            'no-console': 'error',

            // Disallow assignment operators in conditional expressions
            'no-cond-assign': ['error', 'always'],

            // Disallow unnecessary semicolons
            'no-extra-semi': 'error',

            // Disallow comments on the same line as code
            'no-inline-comments': 'error',

            // Disallow `else` blocks after `return` statements in `if` statements
            'no-else-return': 'error',

            'no-restricted-syntax': [
                'error',
                {
                    selector: 'IfStatement > BlockStatement > ExpressionStatement > AssignmentExpression',
                    message: 'Do not modify variables inside if statements.'
                },
                {
                    selector: 'IfStatement > ExpressionStatement > AssignmentExpression',
                    message: 'Do not modify variables inside if statements.'
                }
            ]

        },
    },
];
