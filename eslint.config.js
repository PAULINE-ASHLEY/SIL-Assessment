// Import base ESLint rules for JavaScript
import js from '@eslint/js';

// Import React-specific linting rules
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Import predefined globals (browser, node, vitest, etc.)
import globals from 'globals';

export default [
  js.configs.recommended, // Start from ESLint's recommended JavaScript rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Apply rules to JS/TS/JSX/TSX files
    ignores: ['dist/**', 'node_modules/**', 'public/**'], // Ignore build and dependency folders
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021, // Enable modern JS syntax (up to ES2021)
        sourceType: 'module', // Allow ES module imports/exports
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
      },
      globals: {
        ...globals.browser, // Allow browser globals (window, document, etc.)
        ...globals.node, // Allow Node.js globals (process, __dirname, etc.)
        ...globals.vitest, // Allow Vitest globals (test, expect, describe, etc.)
      },
    },
    plugins: {
      react, // React rules
      'react-hooks': reactHooks, // Rules for React hooks
      'jsx-a11y': jsxA11y, // Accessibility checks for JSX
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+ (no need to import React everywhere)
      'react/prop-types': 'off', // Skip PropTypes (use TypeScript instead if needed)
      'react-hooks/rules-of-hooks': 'error', // Enforce correct hook usage
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
      'react/jsx-uses-vars': 'error', // Prevent unused variable errors for JSX components
      'react/jsx-uses-react': 'off', // Not needed in React 17+ (JSX transform handles React automatically)
    },
    settings: {
      react: { version: 'detect' }, // Auto-detect React version for linting
    },
  },
];
