import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/buddy-harmony/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      common: path.resolve(import.meta.dirname, './src/common'),
      hooks: path.resolve(import.meta.dirname, './src/hooks'),
      modules: path.resolve(import.meta.dirname, './src/modules'),
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
