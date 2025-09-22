import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // lets you use describe/it/expect without imports
    environment: 'jsdom', // needed for React components
    setupFiles: './src/setupTests.js', // setup for matchers / mocks
    include: ['src/__tests__/**/*.test.{js,jsx}'], // central test folder
    css: true, // optional: allows CSS imports inside components
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      navigation: path.resolve(__dirname, './src/navigation'),
      app: path.resolve(__dirname, './src/app'),
      assets: path.resolve(__dirname, './src/assets'),
      // add more as needed
    },
  },
});
