import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global APIs like `describe`, `it`, etc.
    environment: 'jsdom', // Simulates a browser-like environment
    setupFiles: './tests/setupTests.ts', // Runs before all tests
    coverage: {
      provider: 'istanbul', // Enables test coverage
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
