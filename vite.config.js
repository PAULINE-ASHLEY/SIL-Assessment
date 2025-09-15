import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // allows using describe/it/expect without imports
    environment: 'jsdom', // simulate browser for React components
    setupFiles: './src/setupTests.js', // extra config (e.g. jest-dom matchers)
  },
});
