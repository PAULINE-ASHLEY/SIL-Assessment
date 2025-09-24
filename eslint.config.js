import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  js.configs.recommended, // Starts ESLint's recommended JavaScript rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Applies rules to JS/TS/JSX/TSX files
    ignores: ['dist/**', 'node_modules/**', 'public/**'], // Ignores build and dependency folders
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021, // Enables modern JS syntax
        sourceType: 'module', // Allows ES module imports/exports
        ecmaFeatures: { jsx: true }, // Enables JSX parsing
      },
      globals: {
        ...globals.browser, // Allows browser globals
        ...globals.node, // Allows Node.js globals
        ...globals.vitest, // Allow sVitest globals
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks, // Rules for React hooks
      'jsx-a11y': jsxA11y, // Accessibility checks for JSX
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // No need to import React everywhere
      'react/prop-types': 'off', // Skips PropTypes
      'react-hooks/rules-of-hooks': 'error', // Enforces correct hook usage
      'react-hooks/exhaustive-deps': 'warn', // Warns about missing dependencies in useEffect
      'react/jsx-uses-vars': 'error', // Prevents unused variable errors for JSX components
      'react/jsx-uses-react': 'off', // JSX transform handles React automatically
    },
    settings: {
      react: { version: 'detect' }, // Auto-detects React version for linting
    },
  },
];
