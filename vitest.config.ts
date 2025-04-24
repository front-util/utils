import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'tests/**', '**/*.d.ts'],
      all: true,
    },
  },
  resolve: {
    alias: {
      '#src': path.resolve(__dirname, './src/utils'),
    },
  },
});