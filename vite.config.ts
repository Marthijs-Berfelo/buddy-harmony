import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/buddy-harmony/',
  resolve: {
    alias: {
      common: path.resolve(__dirname, './src/common'),
      hooks: path.resolve(__dirname, './src/hooks'),
      modules: path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['json-summary', 'lcov', 'text'],
      include: ['src/**'],
    },
  },
});
